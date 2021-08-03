import React, { useState, useEffect } from 'react'
import { Form, Button, Col, Row } from "react-bootstrap";
import Amplify, { Auth, Storage } from "aws-amplify";
import { useHistory } from 'react-router'
import awsconfig from "../../../aws-exports";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { API, graphqlOperation } from "aws-amplify";
import { listEmployees } from '../../../graphql/queries'
import XLSX from 'xlsx';
// import '../../../Login.css';

Amplify.configure(awsconfig);
const initialFormState = {
  employee_Id: 'id_lads',
  username: '',
  full_name: '',
  father_name: '',
  cnic: '',
  password: '',
  email: '',
  phone_number: '',
  phone2: '',
  role: 'hr',
  address: '',
  supervisor: 'hr',
  picture: '',
  salary: '',
  company: 'Lads Technology',
  blood_group: '',
  transport_mode: '',
  vichel_no: '',
  dob: '',
  doj: '',
  status: 'active',
  end_date: '',
  last_degree: '',
  institute: '',
  authCode: '',
  formType: 'signUp'
}

const AddEmployee = () => {
  const [loading, setLoading] = React.useState(false);
  const [getEmployee, setGetEmployee] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState([]);
  const [Err, setErr] = React.useState('');
  const UserID = [];
  const [store, setStore] = React.useState({ fileUrl: '', file: '', filename: '' });

  const handleChange = (e) => {
    const file = e.target.files[0];
    setStore({
      fileUrl: URL.createObjectURL(file),
      file,
      filename: file.name
    })
  }

  React.useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const EmployeeData = await API.graphql(graphqlOperation(listEmployees));
      const EmpData = EmployeeData.data.listEmployees.items;
      setGetEmployee(EmpData);
    }
    catch (error) {
      console.log('error on fetching data', error);
    }
  }
  React.useEffect(() => {
    const results = getEmployee.filter(person => {
      if (person.role === 'lead' && person.company.toLowerCase() === 'lads technology' || person.role === 'hr' && person.company.toLowerCase() === 'lads technology') {
        return true
      }
      else {
        return false
      }
    })
    setSearchResults(results);
  }, [getEmployee])

  const history = useHistory();
  const [formState, setFormState] = useState(initialFormState);
  const onChange = (e) => {
    e.persist();
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }
  const signUp = async () => {
    console.log(formState)
    if (formState.username && formState.full_name && formState.father_name && formState.cnic && formState.password && formState.email && formState.role && formState.supervisor && formState.phone_number && formState.company && formState.address && formState.status) {
      Storage.put(store.filename, store.file)
        .then((data) => {
          setStore({ fileUrl: '', file: '', filename: '' })
        })
        .catch((err) => console.log(err))
      await Auth.signUp({
        username: formState.username,
        password: formState.password,
        attributes: {
          email: formState.email,
          phone_number: formState.phone_number,
          'custom:role': formState.role,
          'custom:full_name': formState.full_name,
          'custom:father_name': formState.father_name,
          'custom:cnic': formState.cnic,
          'custom:employee_Id': formState.employee_Id,
          'custom:salary': formState.salary,
          'custom:supervisor': formState.supervisor,
          'custom:address': formState.address,
          'custom:picture': store.filename,
          'custom:phone2': formState.phone2,
          'custom:company': formState.company,
          'custom:blood_group': formState.blood_group,
          'custom:transport_mode': formState.transport_mode,
          'custom:vichel_no': formState.vichel_no,
          'custom:dob': formState.dob,
          'custom:doj': formState.doj,
          'custom:status': formState.status,
          'custom:end_date': formState.end_date,
          'custom:last_degree': formState.last_degree,
          'custom:institute': formState.institute,
        }
      }).then((data) => {
        UserID.push(data.userSub);
        setLoading(true);
        window.setTimeout(() => {
          setLoading(false);
          history.push(`/editjobhistory/${UserID[UserID.length - 1]}`);
        }, 2000)
      }
      ).catch((err) => {
        setErr(err.message)
        window.setTimeout(() => {
          setErr('')
        }, 5000)
      });
    }
    else {
      setErr('Please fill the form completely');
      window.setTimeout(() => {
        setErr('');
      }, 5000)
    }
  }
  const { formType } = formState;

  const cancelHandler = () => {
    history.push('/admin/team');
  }


  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: 'buffer' });
        const wbname = wb.SheetNames[0];
        const ws = wb.Sheets[wbname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
    promise.then((d) => {
      d.map(async (emp) => {
        await Auth.signUp({
          username: emp.userid,
          password: emp.password,
          attributes: {
            email: emp.email,
            phone_number: `+${emp.phone1}`,
            'custom:role': emp.role,
            'custom:full_name': emp.fullname,
            'custom:father_name': emp.father_name,
            'custom:cnic': emp.cnic,
            'custom:employee_Id': emp.id,
            'custom:salary': emp.salary,
            'custom:supervisor': emp.supervisor,
            'custom:address': emp.address,
            'custom:picture': '',
            'custom:phone2': `+${emp.phone2}`,
            'custom:company': emp.company,
            'custom:blood_group': emp.blood_group,
            'custom:transport_mode': emp.trans_mode,
            'custom:vichel_no': emp.vichel_no,
            'custom:dob': emp.dob,
            'custom:doj': emp.doj,
            'custom:status': emp.status,
            'custom:end_date': emp.end_date,
            'custom:last_degree': emp.last_degree,
            'custom:institute': emp.institute,
          }
        }).then((data) => {
          console.log('opration successfull');
          UserID.push(data.userSub);
          setLoading(true);
          window.setTimeout(() => {
            setLoading(false);
            history.push('/admin/team');
          }, 2000)
        }
        ).catch((err) => {
          setErr(err.message)
        });
      })
    })
  }

  return (<>
    <div>
      {
        formType === 'signUp' && (<>
          <h1 id="role-form-title" className="m-2 p-3">Add Employee Details</h1>
          <div id="role-form-outer-div" className="mx-5 px-5">
            <Form id="form" >
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  user id *
                </Form.Label>
                <Col sm={10} className="form-input">
                  <Form.Control
                    type="text"
                    name='username'
                    placeholder="user id"
                    value={formState.username}
                    onChange={onChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Email *
                </Form.Label>
                <Col sm={10} className="form-input">
                  <Form.Control
                    type="email"
                    name='email'
                    placeholder="Email"
                    value={formState.email}
                    onChange={onChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Password *
                </Form.Label>
                <Col sm={10} className="form-input">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name='password'
                    value={formState.password}
                    onChange={onChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Full Name *
                </Form.Label>
                <Col sm={10} className="form-input">
                  <Form.Control
                    type="text"
                    name='full_name'
                    placeholder="Full Name"
                    value={formState.full_name}
                    onChange={onChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Father Name *
                </Form.Label>
                <Col sm={10} className="form-input">
                  <Form.Control
                    type="text"
                    name='father_name'
                    placeholder="Father Name"
                    value={formState.father_name}
                    onChange={onChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  CNIC *
                </Form.Label>
                <Col sm={10} className="form-input">
                  <Form.Control
                    type="text"
                    name='cnic'
                    placeholder="CNIC"
                    value={formState.cnic}
                    onChange={onChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Employee Address *
                </Form.Label>
                <Col sm={4} className="form-input">
                  <Form.Control
                    type="text"
                    name='address'
                    placeholder="Employee Address"
                    value={formState.address}
                    onChange={onChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Employee Picture
                </Form.Label>
                <Col sm={10} className="form-input">
                  <br />
                  <input
                    type="file"
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} >
                <Form.Label column sm={2}>
                  Role *
                </Form.Label>
                <Col sm={4} className="form-input">
                  <Form.Control as="select" onChange={(e) => setFormState({ ...formState, role: e.target.value })} required>
                    {/* <option value="admin">Admin</option>  */}
                    <option value="owner">Owner</option>
                    <option value="hr">HR</option>
                    <option value="hr manager">HR Manager</option>
                    <option value="lead">Lead</option>
                    <option value="employee">Employee</option>

                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Phone#1 *
                </Form.Label>
                <Col sm={10} className="form-input">
                  <PhoneInput
                    country={'pk'}
                    value={formState.phone_number}
                    onChange={(phone) => { phone = `+${phone}`; setFormState({ ...formState, phone_number: phone }); }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Phone#2
                </Form.Label>
                <Col sm={10} className="form-input">
                  <PhoneInput
                    country={'pk'}
                    value={formState.phone2}
                    onChange={(phone) => {
                      phone = `+${phone}`;
                      setFormState({ ...formState, phone2: phone });
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Salary
                </Form.Label>
                <Col sm={10} className="form-input">
                  <Form.Control
                    type="number"
                    name='salary'
                    placeholder="Salary"
                    value={formState.salary}
                    onChange={onChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} >
                <Form.Label column sm={2}>
                  supervisor *
                </Form.Label>
                <Col sm={10} className="form-input">
                  <Form.Control as="select" onChange={(e) => { setFormState({ ...formState, supervisor: e.target.value }); }} required>
                    {
                      searchResults.map((lead) => {
                        return <option value={lead.full_name}>{lead.full_name}</option>
                      })

                    }
                    <option value="owner">owner</option>
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Company Name *
                </Form.Label>
                <Col sm={10} className="form-input">
                  <Form.Control
                    type="text"
                    name='company'
                    placeholder="company name"
                    value={formState.company}
                    //  onChange={onChange}
                    required
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Date Of Birth
                </Form.Label>
                <Col sm={10} className="form-input">
                  <Form.Control
                    type="date"
                    name='dob'
                    placeholder="date of birth"
                    value={formState.dob}
                    onChange={onChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Last Degree
                </Form.Label>
                <Col sm={10} className="form-input">
                  <Form.Control
                    type="text"
                    name='last_degree'
                    placeholder="last degree"
                    value={formState.last_degree}
                    onChange={onChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Institute
                </Form.Label>
                <Col sm={10} className="form-input">
                  <Form.Control
                    type="text"
                    name='institute'
                    placeholder="institute"
                    value={formState.institute}
                    onChange={onChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Date of joining
                </Form.Label>
                <Col sm={10} className="form-input">
                  <Form.Control
                    type="date"
                    name='doj'
                    placeholder="date of joining"
                    value={formState.doj}
                    onChange={onChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} >
                <Form.Label column sm={2}>
                  Status *
                </Form.Label>
                <Col sm={10} className="form-input">
                  <Form.Control as="select" value={formState.status} onChange={(e) => setFormState({ ...formState, status: e.target.value })} required>
                    <option value="active">Active</option>
                    <option value="left">Left</option>
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Termination/resignation Date
                </Form.Label>
                <Col sm={10} className="form-input">
                  <Form.Control
                    type="date"
                    name='end_date'
                    placeholder="date"
                    value={formState.end_date}
                    onChange={onChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Blood Group
                </Form.Label>
                <Col sm={10} className="form-input">
                  <Form.Control
                    type="text"
                    name='blood_group'
                    placeholder="Blood group"
                    value={formState.blood_group}
                    onChange={onChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Transport Mode
                </Form.Label>
                <Col sm={10} className="form-input">
                  <Form.Control
                    type="text"
                    name='transport_mode'
                    placeholder="Transport Mode"
                    value={formState.transport_mode}
                    onChange={onChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Vechile Number
                </Form.Label>
                <Col sm={10} className="form-input">
                  <Form.Control
                    type="text"
                    name='vichel_no'
                    placeholder="vehicle number"
                    value={formState.vichel_no}
                    onChange={onChange}
                    required
                  />
                </Col>
              </Form.Group>
              <div className='px-5' style={{ display: 'flex', flexDirection: 'row', gap: '3vw', marginLeft: '13vw' }}>
                <p className="alert">{Err}</p>
                <Form.Group as={Row} id="form-submit-button" >
                  <Col sm={{ span: 10, offset: 2 }}>
                    <Button disabled={loading ? 'true' : ''} onClick={signUp}>Next</Button>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} id="form-submit-button" >
                  <Col sm={{ span: 10, offset: 2 }} >
                    <Button disabled={loading ? 'true' : ''} className='bg-light' onClick={cancelHandler}>Cancel</Button>
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Col sm={{ span: 10, offset: 2 }} className="form-input">
                    <input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        readExcel(file);
                      }}
                      required
                    />
                  </Col>
                </Form.Group>
              </div>
            </Form>
          </div>
        </>
        )
      }
    </div>
  </>)
}

export default AddEmployee;
