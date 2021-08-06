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
  Table,
  Container,
  Row,
} from "reactstrap";
// core components
import Header from "../../components/Headers/Header.js";

const LeaveTables = () => {
const [leaveResults,setLeaveResults]=React.useState([]);
const [searchTerm, setSearchTerm] = React.useState("");
 const [searchResults, setSearchResults] = React.useState([]);
  const history=useHistory();
     const [getLeaves,setGetLeaves]=React.useState([]);
  const fetchData= async ()=>{
  try{
 const LeavesData = await API.graphql(graphqlOperation(listLeaves))
 const data = LeavesData.data.listLeaves.items;
 const compare=(a,b)=>{
   if(a.from<b.from){
     return -1;
   }
   if(a.from>b.from){
return 1;
   }
   return 0;
 }
 data.sort(compare);
 data.reverse();
 setGetLeaves(data);
 setSearchResults(data);
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
   if(leave.Lead_Approval==='approved' || leave.supervisor==='hr'){
         return true
   }
   else{
   return false
   }
  })
 setLeaveResults(result);
},[getLeaves]);
React.useEffect(()=>{
 const results = getLeaves.filter((leave) =>{
   if(leave.employee.full_name.toLowerCase().includes(searchTerm)){
     return true
   }
   else{
     return false
   }
     
 }
    );
setSearchResults(results);
},[searchTerm])
const handleEdit=(id)=>{
history.push(`/empLeave/${id}`)
}

  return (
    <>
    {
      searchResults?(
        <>
      <Header />
      {/* Page content */}
      <Container className="mt--5" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                  <Input placeholder="Search by employee name"  type="text" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value.toLowerCase())}  />
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
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
    </>):(
      <>
      <Header />
      {/* Page content */}
      <Container className="mt--5" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                  <Input placeholder="Search by employee name"  type="text" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value.toLowerCase())}  />
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
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
    </>)
    }
    </>
  );
};

export default LeaveTables;
