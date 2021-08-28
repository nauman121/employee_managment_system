import React from "react";
// import {id} from '../../index'
import {getEmployee} from '../../../graphql/queries'
import {API,graphqlOperation} from "aws-amplify";
import {id} from '../../../App'
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
  Table,
  Container,
  Row,
  UncontrolledTooltip
} from "reactstrap";
import 'react-bootstrap';
// core components
import Header from "../../components/Headers/Header.js";

import {useHistory} from 'react-router'

const LeaveOfEmployee = () => {
// const id="1";
 const history=useHistory();

    const [Leave,setLeave]=React.useState([]);
  const fetchData= async ()=>{
  try{
const LeavesData=await API.graphql(graphqlOperation(getEmployee,{id:id[id.length-1]}))
console.log(LeavesData);
 const data = LeavesData.data.getEmployee.leaves.items;
 setLeave(data);
  }
  catch(error){
    console.log('error on fetching data',error);
  }
}
const clickHandler=(e)=>{
    e.preventDefault();
    history.push('/leaveForm');
  }

React.useEffect(()=>{
    fetchData();
},[])
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
             <button id='button1' class="btn btn-white" type="submit" onClick={clickHandler}><i class="fa fa-plus" aria-hidden="true"></i></button>
             <UncontrolledTooltip
                  style={{ backgroundColor: "rgba(255, 255, 0, 0.5)",color:'black' }}
                  placement="right"
                  target="button1"
                >
                  Apply for leave
                </UncontrolledTooltip>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    {/* <th scope="col">Leave Id</th>
                    <th scope="col">Employee Id</th> */}
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
                 Leave.map((employee,i)=>{
              return (<>   
               <tr>
                    {/* <td>{employee.id}</td>
                    <td>{employee.employee_id}</td> */}
                    <td>{employee.leave}</td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-warning" />
                        {employee.from}
                      </Badge>
                    </td>
                   
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">{employee.to}</span>
                       
                      </div>
                    </td>
                    <td>{employee.Hr_Approval}</td>
                     <td>{employee.Lead_Approval}</td>
                    <td>{employee.remarks}</td>
                    <td>{employee.type}</td>
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
                            onClick={(e) => e.preventDefault()}
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
                {/* <nav aria-label="...">
                  <Pagination
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
                  </Pagination>
                </nav> */}
              </CardFooter>
            </Card>
          </div>
        </Row>   
      </Container>
    </>
  );
};

export default LeaveOfEmployee ;
