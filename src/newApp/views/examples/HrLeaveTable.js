import React from "react";
 import {API,graphqlOperation} from "aws-amplify";
import {listLeaves} from '../../../graphql/queries'
import {useHistory} from 'react-router'
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
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
} from "reactstrap";
// core components
import Header from "../../components/Headers/Header.js";

const HrLeaveTables = () => {
const [leaveResults,setLeaveResults]=React.useState([]);

  const history=useHistory();
     const [getLeaves,setGetLeaves]=React.useState([]);
  const fetchData= async ()=>{
  try{
 const LeavesData = await API.graphql(graphqlOperation(listLeaves))
 const data = LeavesData.data.listLeaves.items
 setGetLeaves(data);
  }
  catch(error){
    console.log('error on fetching data',error);
  }
}
React.useEffect(()=>{
fetchData()
},[])

React.useEffect(()=>{
 const result= getLeaves.filter((leave)=>
 {
if(!leave){
  return false
}
else{
   if(window.location.hostname.toLowerCase().includes(leave.employee.company.toLowerCase()) && leave.Lead_Approval==='approved' || leave.supervisor==='hr'){
    return true
   }
   else{
   return false
   }
  }})
 setLeaveResults(result);
},[getLeaves]);

const handleEdit=(id)=>{
history.push(`/empLeave/${id}`)
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
              <CardHeader className="border-0">
                <h3 className="mb-0">Leaves Record</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    {/* <th scope="col">Leave Id</th> */}
                    {/* <th scope="col">Employee Id</th> */}
                    <th scope="col">Employee Name</th>
                    <th scope="col">Leave</th>
                    <th scope="col">From</th>
                    <th scope="col">To</th>
                    <th scope="col">Hr Approval</th>
                     <th scope="col">Lead Approval</th>
                    <th scope="col">Remarks</th>
                     <th scope="col">Type</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {
                leaveResults.map((leave,i)=>{
              return (<>   
               <tr key={i}>
                    {/* <td>{leave.id}</td> */}
                    {/* <td>{leave.employee_id}</td> */}
                    <td>{leave.employee.full_name}</td>
                    <td>{leave.leave}</td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-warning" />
                        {leave.from}
                      </Badge>
                    </td>
                    <td>{leave.to}</td>
                    <td>{leave.Hr_Approval}</td>
                    <td>{leave.Lead_Approval}</td>
                    <td>{leave.remarks}</td>
                    <td>{leave.type}</td>
                    <td className="text-right">
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
                            onClick={(e) => handleEdit(leave.id)}
                          >
                             Edit
                          </DropdownItem>

                          {/* <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Delete
                          </DropdownItem> */}
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
                {/* <nav aria-label="..."> */}
                  {/* <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination> */}
                {/* </nav> */}
              </CardFooter>
            </Card>
          </div>
        </Row>   
      </Container>
    </>
  );
};

export default HrLeaveTables;
