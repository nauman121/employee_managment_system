import React from 'react'
import { Form, Button, Col, Row } from "react-bootstrap";
import {API,graphqlOperation,Storage} from "aws-amplify";
import {updateEmployee} from '../../../graphql/mutations'
import {useParams} from 'react-router'
import {getEmployee} from '../../../graphql/queries'
import {useHistory} from 'react-router'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {listEmployees} from '../../../graphql/queries'

const UpdateEmployee=()=> {
   const [GetEmployee,setGetEmployee]=React.useState([]);
 const [searchResults, setSearchResults] = React.useState([]);
 const history=useHistory();
   const {id}=useParams();   
const [store,setStore] = React.useState({fileUrl:'',file:'',filename:''});

const handleChange=(e)=>{
  const file=e.target.files[0];
setStore({fileUrl:URL.createObjectURL(file),
file,
filename:file.name
})
}

const [employee,setEmployee]=React.useState({})
 

const getUser=async()=>{
  try{
const data=await API.graphql(graphqlOperation(getEmployee,{id:id}))
const empData = data.data.getEmployee;
setStore({...store,filename:empData.employee_pic});
setEmployee({id:id,employee_id:empData.employee_id,employee_name:empData.employee_name,full_name:empData.full_name,father_name:empData.father_name,cnic:empData.cnic,employee_addr:empData.employee_addr,employee_email:empData.employee_email,employee_pic:store.filename,employee_password:empData.employee_password,employee_phone1:empData.employee_phone1,employee_phone2:empData.employee_phone2,employee_salary:empData.employee_salary,role:empData.role,supervisor:empData.supervisor,company:empData.company,blood_group:empData.blood_group,transport_mode:empData.transport_mode,vichel_no:empData.vichel_no,dob:empData.dob,doj:empData.doj,status:empData.status,end_date:empData.end_date,last_degree:empData.last_degree,institute:empData.institute});
  }
 catch(error){
console.log('hello',error);
  }
}
React.useEffect(()=>{
   getUser();
},[])
React.useEffect(()=>{
       fetchData();
    },[]);


    const fetchData= async ()=>{
  try{ 
       const EmployeeData = await API.graphql(graphqlOperation(listEmployees));
  console.log('hello');
      const EmpData = EmployeeData.data.listEmployees.items;
//  console.log('employee',EmpData);
 setGetEmployee(EmpData);

//   setSearchResults(EmpData);
  }
  catch(error){
    console.log('error on fetching data',error);
  }
    }
React.useEffect(()=>{
 const results = GetEmployee.filter(person =>{
     if(person.role==='lead'  && person.company.toLowerCase()==='lads technology' || person.role==='hr'  && person.company.toLowerCase()==='lads technology'){
       return true
     }
     else
     {
       return false
     }
    })
    setSearchResults(results);
},[GetEmployee])

  const clickHandler=(e)=>{
       e.preventDefault()
Storage.put(store.filename,store.file)
  .then((data)=>{
    console.log('successfully updated');
  })
  .catch((err)=>console.log(err));
  window.setTimeout(()=>{
         updateUser();
  history.push('/admin/team');
  
    },1000)
  }
   const updateUser=async ()=>{
  try{
    const updateData={id:employee.id,employee_id:employee.employee_id,employee_name:employee.employee_name,full_name:employee.full_name,father_name:employee.father_name,cnic:employee.cnic,employee_addr:employee.employee_addr,employee_email:employee.employee_email,employee_phone1:employee.employee_phone1,employee_phone2:employee.employee_phone2,employee_password:employee.employee_password,employee_pic:store.filename,employee_salary:employee.employee_salary,role:employee.role,supervisor:employee.supervisor,company:employee.company,blood_group:employee.blood_group,dob:employee.dob,doj:employee.doj,status:employee.status,end_date:employee.end_date,last_degree:employee.last_degree,institute:employee.institute,transport_mode:employee.transport_mode,vichel_no:employee.vichel_no}
    
     await API.graphql(graphqlOperation(updateEmployee,{input:updateData}))
     console.log('operation successful');
  }
  catch(error){
    console.log(error);
  }
}

 const cancelHandler=()=>{
   history.push('/admin/team');
 }

    return (<>
        <div>
        <h1 id="role-form-title" className="m-2 p-3">Update Employee Details</h1>
        <div id="role-form-outer-div" className="mx-5 px-5">
          <Form id="form" ><Form.Group as={Row}>
              <Form.Label column sm={2}>
              user id
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="user id"
                  value={employee.employee_name}
                  onChange={(e)=>setEmployee({...employee,employee_name:e.target.value})}
                  required
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
               Full Name
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Full Name"
                  value={employee.full_name}
                  onChange={(e)=>setEmployee({...employee,full_name:e.target.value})}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
              Father Name
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="father Name"
                  value={employee.father_name}
                  onChange={(e)=>setEmployee({...employee,father_name:e.target.value})}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
              CNIC
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="CNIC"
                  value={employee.cnic}
                  onChange={(e)=>setEmployee({...employee,cnic:e.target.value})}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Email
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={employee.employee_email}
                  onChange={(e)=>setEmployee({...employee,employee_email:e.target.value})}
                  required
                />
              </Col>
            </Form.Group>
             <Form.Group as={Row}>
              <Form.Label column sm={2}>
               Employee Address
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Employee Address"
                  value={employee.employee_addr}
                  onChange={(e)=>setEmployee({...employee,employee_addr:e.target.value})}
                  required
                />
              </Col>
            </Form.Group>
             <Form.Group as={Row}>
              <Form.Label column sm={2}>
               Employee Picture
              </Form.Label>
              <Col sm={10} className="form-input">
                <input
                  type="file"
                   onChange={handleChange}
                  required
                />
                {/* <img src={store.fileUrl} /> */}
              </Col>
             </Form.Group>
            <Form.Group as={Row} >
              <Form.Label column sm={2}>
                Role
             </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" value={employee.role} onChange={(e)=>setEmployee({...employee,role:e.target.value})} required>
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
                Phone#1
              </Form.Label>
              <Col sm={10} className="form-input">
                          <PhoneInput
  country={'pk'}
  value={employee.employee_phone1}
  onChange={(phone) => {phone=`+${phone}`;
   setEmployee({...employee, employee_phone1:phone});}}
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
  value={employee.employee_phone2}
  onChange={(phone) => {phone=`+${phone}`;
   setEmployee({...employee, employee_phone2:phone});}}
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
                  placeholder="Salary"
                  value={employee.employee_salary}
                  onChange={(e)=>setEmployee({...employee,employee_salary:parseInt(e.target.value)})}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} >
              <Form.Label column sm={2}>
                supervisor
             </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" value={employee.supervisor} onChange={(e)=>setEmployee({...employee,supervisor:e.target.value})} required>
                  {
                    searchResults.map((lead)=>{
                     return  <option value={lead.full_name}>{lead.full_name}</option> 
                    })
                   
                  } 
                  <option value="owner">owner</option> 
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                  Company Name
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="company"
                  value={employee.company}
                  // onChange={(e)=>setEmployee({...employee,company:e.target.value})}
                  required
                  disabled
                />
              </Col>
         </Form.Group>
         <Form.Group as={Row}>
              <Form.Label column sm={2}>
                  Blood group
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Blood group"
                  value={employee.blood_group}
                  onChange={(e)=>setEmployee({...employee,blood_group:e.target.value})}
                  required
                />
              </Col>
         </Form.Group>
         <Form.Group as={Row}>
              <Form.Label column sm={2}>
                  Date of birth
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="date"
                  placeholder="date of birth"
                  value={employee.dob}
                  onChange={(e)=>setEmployee({...employee,dob:e.target.value})}
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
                  placeholder="date of joining"
                  value={employee.doj}
                  onChange={(e)=>setEmployee({...employee,doj:e.target.value})}
                  required
                />
              </Col>
         </Form.Group>
         <Form.Group as={Row} >
              <Form.Label column sm={2}>
                Status
             </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" value={employee.status} onChange={(e)=>setEmployee({...employee,status:e.target.value})} required>
                   {/* <option value="admin">Admin</option>  */}
                   <option value="active">Active</option>
                   <option value="left">Left</option>    
                </Form.Control>
              </Col>
            </Form.Group>
         <Form.Group as={Row}>
              <Form.Label column sm={2}>
                  Left Date
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="date"
                  placeholder="date of left"
                  value={employee.end_date}
                  onChange={(e)=>setEmployee({...employee,end_date:e.target.value})}
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
                  placeholder="last degree"
                  value={employee.last_degree}
                  onChange={(e)=>setEmployee({...employee,last_degree:e.target.value})}
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
                  placeholder="institute"
                  value={employee.institute}
                  onChange={(e)=>setEmployee({...employee,institute:e.target.value})}
                  required
                />
              </Col>
         </Form.Group>
         <Form.Group as={Row}>
              <Form.Label column sm={2}>
                 Transport mode
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="transport mode"
                  value={employee.transport_mode}
                  onChange={(e)=>setEmployee({...employee,transport_mode:e.target.value})}
                  required
                />
              </Col>
         </Form.Group>
         <Form.Group as={Row}>
              <Form.Label column sm={2}>
                  Vehicle Number
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="vehicle number"
                  value={employee.vichel_no}
                  onChange={(e)=>setEmployee({...employee,vichel_no:e.target.value})}
                  required
                />
              </Col>
         </Form.Group>
            <div className='px-5'  style={{display:'flex',flexDirection:'row',gap:'3vw',marginLeft:'13vw'}}>
            <Form.Group as={Row} id="form-submit-button" >
              <Col sm={{ span: 10, offset:2}}>
                <Button  onClick={clickHandler}>Update</Button>
              </Col>
            </Form.Group>
            <Form.Group as={Row} id="form-submit-button" >
              <Col sm={{ span: 10, offset:2}} >
                 <Button className='bg-light'  onClick={cancelHandler}>Cancel</Button>
              </Col>
            </Form.Group>
            </div>
          </Form>
      </div>
</div>
   </> )
}

export default UpdateEmployee;
