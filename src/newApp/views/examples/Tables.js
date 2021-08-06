import React from "react";
import {FaArrowsAltV} from 'react-icons/fa';
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
import {listEmployees} from '../../../graphql/queries'
import {useHistory} from 'react-router'


const Tables = () => {
  const history=useHistory();
  const [getEmployee,setGetEmployee]=React.useState([]);
const [currentPage,setCurrentPage]=React.useState(1);
const [postsPerPage]=React.useState(5);
const [searchTerm, setSearchTerm] = React.useState("");
 const [searchResults, setSearchResults] = React.useState([]);

React.useEffect(()=>{
       fetchData();
    },[]);

    const fetchData= async ()=>{
  try{
 const EmployeeData = await API.graphql(graphqlOperation(listEmployees));
 const EmpData = EmployeeData.data.listEmployees.items;

 //sorting table by full name

  const compare=( a, b )=> {
  if ( a.full_name < b.full_name ){
    return -1;
  }
  if ( a.full_name > b.full_name ){
    return 1;
  }
  return 0;
}
EmpData.sort(compare);
//Adding employee records in state hook
 setGetEmployee(EmpData);
 setSearchResults(EmpData);
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

  React.useEffect(()=>{
 const results = getEmployee.filter((person) =>{
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
//Get Current Posts
const indexOfLastPost=currentPage * postsPerPage;
const indexOfFirstPost=indexOfLastPost-postsPerPage;
const currentPosts=searchResults.slice(indexOfFirstPost,indexOfLastPost);

  const [isSorted,setIsSorted]=React.useState(false);
//Reversing table onClick
const sortTable=()=>{
if(isSorted){
searchResults.reverse();
setIsSorted(false);
}
else{
  searchResults.reverse();
  setIsSorted(true);
}
  
}

//pagination

const pageNumbers=[];
const totalPosts=searchResults.length;
for(let i=1;i<=Math.ceil(totalPosts/postsPerPage);i++){
  pageNumbers.push(i);
}
const paginate=(pageNumber)=>setCurrentPage(pageNumber);

  return (
    <>
    {
      searchTerm?(<>
      <Header />
      {/* Page content */}
      <Container className="mt--5" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-5" style={{display:'flex',flexDirection:'row'}}>
                <button class="btn btn-white mx-2" type="submit" onClick={clickHandler}><i class="fa fa-plus"  aria-hidden="true"></i></button>
                   
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
                     <th scope="col" onClick={()=>sortTable()}>Full Name <FaArrowsAltV/></th>
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
                     <td style={{fontSize:'12px',textTransform:'capitalize'}}>
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
                <nav>
                  <ul className='pagination'>
                    {
                      pageNumbers.map((number)=>{
                       return <li key={number} className='page-item'>
                          <a onClick={(e)=>{
                            e.preventDefault();
                            paginate(number);
                            }} href="!#" className='page-link'>
                          {number}
                          </a>
                        </li>
                      })
                    }
                  </ul>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>   
      </Container>
      </>):(<>
      <Header />
      {/* Page content */}
      <Container className="mt--5" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-5" style={{display:'flex',flexDirection:'row'}}>
                <button class="btn btn-white mx-2" type="submit" onClick={clickHandler}><i class="fa fa-plus"  aria-hidden="true"></i></button>
                   
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
                     <th scope="col" onClick={()=>sortTable()}>Full Name <FaArrowsAltV/></th>
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
                currentPosts.map((employee,i)=>{
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
                     <td style={{fontSize:'12px',textTransform:'capitalize'}}>
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
                <nav>
                  <ul className='pagination'>
                    {
                      pageNumbers.map((number)=>{
                       return <li key={number} className='page-item'>
                          <a onClick={(e)=>{
                            e.preventDefault();
                            paginate(number);
                            }} href="!#" className='page-link'>
                          {number}
                          </a>
                        </li>
                      })
                    }
                  </ul>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>   
      </Container>
      </>)
    }
    </>
  );
};

export default Tables;