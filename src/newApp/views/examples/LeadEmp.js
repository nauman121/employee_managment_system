import React from "react";
import {Auth} from "aws-amplify";
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  // Progress,
  Table,
  Container,
  Row,
  InputGroupText,
  Form,
  InputGroup,
  InputGroupAddon,
  Input,
  FormGroup
    // UncontrolledTooltip,
} from "reactstrap";
import 'react-bootstrap';
// core components
import Header from "../../components/Headers/Header";
 import {API,graphqlOperation} from "aws-amplify";
import {getEmployee, listEmployees} from '../../../graphql/queries'
import {useHistory} from 'react-router'
import {id} from '../../../App'
import {emp_full_name} from '../../../App'

const LeadEmp = () => {
const history=useHistory();
const userId=id[id.length-1];
const fullName=emp_full_name[emp_full_name.length-1];
const [GetEmployee,setGetEmployee]=React.useState([]);
 const [searchResults, setSearchResults] = React.useState([]);

React.useEffect(()=>{
       fetchData();
    },[]);

    //Function for Fetching employee list from database

    const fetchData= async ()=>{
  try{ 
       const EmployeeData = await API.graphql(graphqlOperation(listEmployees));
      const EmpData = EmployeeData.data.listEmployees.items;
 setGetEmployee(EmpData);
  }
  catch(error){
    console.log('error on fetching data',error);
  }
    }

 //Filter Lead Team From Employees List

React.useEffect(()=>{
 const results = GetEmployee.filter(person =>
      person.supervisor.toLowerCase()===fullName.toLowerCase()
    )
    setSearchResults(results);
},[GetEmployee])

//Pushing Evaluation Form Route

const clickHandler=(id)=>{
  history.push(`/evaluationform/${id}`);
}
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--5" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-5" style={{display:'flex',flexDirection:'row'}}>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Status</th>
                    <th scope="col">Picture</th>
                    <th scope="col">user id</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">Father Name</th>
                    <th scope="col">CNIC</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone1</th>
                    <th scope="col">Phone2</th>
                    <th scope="col">Address</th>
                    <th scope="col">Role</th>
                    <th scope="col">Supervisor</th>
                    <th scope="col">Salary</th>
                    <th scope="col">company</th>
                    <th scope="col">Blood Group</th>
                    <th scope="col">Transport Mode</th>
                    <th scope="col">vehicle Number</th>
                    <th scope="col">Date of Birth</th>
                    <th scope="col">Date of joining</th>
                    <th scope="col">Left Date</th>
                    <th scope="col">Last Degree</th>
                    <th scope="col">Institute</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {
                 searchResults.map((employee,i)=>{
              return (<>
               <tr >
                    <td style={{fontSize:'12px',fontWeight:'900'}} className={`text-white ${employee.status==='active'?'bg-success':'bg-danger'}`}>{employee.status}</td>
                   <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          style={{height:'30px',width:'30px'}}
                        >
                          <img
                            alt="..."
                              style={{height:'100%',width:'100%' , objectFit:'fit'}}
                            src={`https://ems3425b0d312534fc887d7f1545129bee9134248-dev.s3.ap-southeast-1.amazonaws.com/public/${employee.employee_pic}`}/>
                         </a>
                        <Media>
                        </Media>
                      </Media>
                    </th> 
                    <td style={{fontSize:'12px'}}>{employee.employee_name}</td>
                    <td style={{fontSize:'12px'}}>
                       <a href={`/user/${employee.id}`}>{employee.full_name}</a>
                    </td>
                    <td style={{fontSize:'12px'}}>{employee.father_name}</td>
                    <td style={{fontSize:'12px'}}>{employee.cnic}</td>
                    <td style={{fontSize:'12px'}}>{employee.employee_email}</td>
                    <td style={{fontSize:'12px'}}>{employee.employee_phone1}</td>
                    <td style={{fontSize:'12px'}}>{employee.employee_phone2}</td>
                    <td style={{fontSize:'12px'}}>{employee.employee_addr}</td>
                    <td style={{fontSize:'12px'}}>{employee.role}</td>
                    <td style={{fontSize:'12px'}}>{employee.supervisor}</td>
                    <td style={{fontSize:'12px'}}>{employee.employee_salary}</td>
                    <td style={{fontSize:'12px'}}>{employee.company}</td>
                    <td style={{fontSize:'12px'}}>{employee.blood_group}</td>
                    <td style={{fontSize:'12px'}}>{employee.transport_mode}</td>
                    <td style={{fontSize:'12px'}}>{employee.vichel_no}</td>
                    <td style={{fontSize:'12px'}}>{employee.dob}</td>
                     <td style={{fontSize:'12px'}}>{employee.doj}</td>
                    <td style={{fontSize:'12px'}}>{employee.end_date}</td>
                     <td style={{fontSize:'12px'}}>{employee.last_degree}</td>
                    <td style={{fontSize:'12px'}}>{employee.institute}</td>
                    <td style={{fontSize:'12px'}} className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                             onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                         onClick={()=>clickHandler(employee.id)}
                          >
                            Evalution Form
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>  
                  </>
              )
                 })
                     }
                </tbody>
              </Table>
              <CardFooter className="py-4">
               </CardFooter>
            </Card>
          </div>
        </Row>   
      </Container>
    </>
  );
};

export default LeadEmp;
