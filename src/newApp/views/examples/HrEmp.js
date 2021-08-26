import React from "react";
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
  Table,
  Container,
  Row,
  InputGroupText,
  Form,
  InputGroup,
  InputGroupAddon,
  Input,
  FormGroup,
  Tooltip
} from "reactstrap";
import 'react-bootstrap';
// core components
import Header from "../../components/Headers/Header";
 import {API,graphqlOperation} from "aws-amplify";
import {listEmployees} from '../../../graphql/queries'
import {useHistory} from 'react-router'

const HrEmp = () => {

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

const [HrTeam,setHrTeam]=React.useState([]);
const [searchTerm, setSearchTerm] = React.useState("");
 const [searchResults, setSearchResults] = React.useState([]);
React.useEffect(()=>{
 const results = HrTeam.filter((person) =>{
   if( person.full_name.toLowerCase().includes(searchTerm) || person.supervisor.toLowerCase().includes(searchTerm)){
     return true
   }
   else{
     return false
   }
     
 }
    );
    setSearchResults(results);
},[searchTerm])
  const history=useHistory();
  const [getEmployee,setGetEmployee]=React.useState([]);
React.useEffect(()=>{
       fetchData();
      
    },[]);
React.useEffect(()=>{
const results = getEmployee.filter((person) =>{
   if(person.company.toLowerCase()==='lads technology' ){
     return true
   }
   else{
     return false
   }
 }
    );
    setHrTeam(results);
    setSearchResults(results);
},[getEmployee])
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
const handleEdit =(id)=>{
history.push(`/${id}`);
}
const handleEditJOb =(id)=>{
history.push(`/editjobhistory/${id}`);
}
const handleWarnig =(id)=>{
history.push(`/warning/${id}`);
}
  const clickHandler=(e)=>{
    e.preventDefault();
    history.push('/addemployee');
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
                <button class="btn btn-white mx-2" type="submit" id='TooltipExample' onClick={clickHandler}><i class="fa fa-plus"  aria-hidden="true" ></i></button>
                   <Tooltip placement="right" isOpen={tooltipOpen} target="TooltipExample" toggle={toggle}>
                   Add Employee
                   </Tooltip>
              <InputGroup className="input-group-alternative" style={{width:'30vw',boxShadow:'1px 1px 2px lightGray'}}>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText >
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search by employee name / Lead name"  type="text" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value.toLowerCase())}  />
              </InputGroup>
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
              
               <tr>
                    <td style={{fontSize:'12px',fontWeight:'900'}} className={`text-white ${employee.status==='active'?'bg-success':'bg-danger'}`}>{employee.status}</td>
                  <th scope="row">
                      <Media className="align-items-center">
                         <a
                          className="avatar rounded-circle mr-3"
                           href={`/user/${employee.id}`}
                          style={{height:'30px',width:'30px'}}
                        >
                           <img
                           style={{height:'100%',width:'100%' , objectFit:'fit'}}
                            alt="..."
                            src={`https://ems3425b0d312534fc887d7f1545129bee970119-production.s3.eu-west-1.amazonaws.com/public/${employee.employee_pic}`}
                          /> 
                         </a>
                        </Media>
                      
                    </th> 
                   
                    <td style={{fontSize:'12px'}}>
                       {employee.employee_name} 
                    </td>
                     <td style={{fontSize:'12px'}}>
                       {employee.full_name}
                    </td>
                     <td style={{fontSize:'12px'}}>
                        {employee.father_name}
                    </td>
                     <td style={{fontSize:'12px'}}>
                        {employee.cnic}
                    </td>
                   <td style={{fontSize:'12px'}}> {employee.employee_email} </td>
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
                    <td style={{fontSize:'12px'}}className="text-right">
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
                            onClick={(e) => handleEdit(employee.id)}
                          >
                            Edit Profile
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => handleEditJOb(employee.id)}
                          >
                             Edit Jobs
                          </DropdownItem>
                           <DropdownItem
                            href="#pablo"
                            onClick={(e) => handleWarnig(employee.id)}
                          >
                             Add Warnings
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

export default HrEmp;
