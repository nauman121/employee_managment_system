//pakages for this program 
import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listLeaves,getEmployee } from "../../../graphql/queries";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {onCreateLeave} from '../../../graphql/subscriptions'
// reactstrap components
import {
  Input,
  InputGroupText,
  InputGroup,
  InputGroupAddon,
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
import {roleArr} from '../../../App';
//importing Hr full name field from app.js
import { emp_full_name } from "../../../App";
//importing id from app
import { id } from "../../../App";
// core components
import Header from "../../components/Headers/Header.js";
//LeaveTables functional component starting from here
const LeaveTables = () => {
  
  //useState hooks used in this program
  const [leaveResults, setLeaveResults] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchDate, setSearchDate] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [getLeaves, setGetLeaves] = React.useState([]);
  const [empName, setEmpName] = React.useState("");
  //useHistory function assinging
  const history = useHistory();
  //assinging hr full name to variable
  const hrName = emp_full_name[emp_full_name.length - 1];
  //assigning userId
  const userId = id[id.length - 1];
    //assinging role to variable
  const role=roleArr[roleArr.length-1];
  //function for fetching leave data from database
    


    const fetchData = async () => {
      if(role==='hr' || role==='hr manager'){
    try {
      const LeavesData = await API.graphql(graphqlOperation(listLeaves));
      const data = LeavesData.data.listLeaves.items;
     
         //function for comparing data and arranging it in ascending orders
      const compare = (a, b) => {
        if (a.updatedAt > b.updatedAt) {
          return -1;
        }
        if (a.updatedAt > b.updatedAt) {
          return 1;
        }
        return 0;
      };
      //sorting function
      data.sort(compare);
      //storing sorted leaves in getLeaves hook
      setGetLeaves(data);
      } catch (error) {
      console.log("error on fetching data", error);
    }
  };
   if(role==='lead'){
    try {
      const data = await API.graphql(
        graphqlOperation(getEmployee, { id: userId })
      );
      const empData = data.data.getEmployee.full_name;
      setEmpName(empData);
      const LeavesData = await API.graphql(graphqlOperation(listLeaves));
      const Ldata = LeavesData.data.listLeaves.items;
      //function for comparing data and arranging it in ascending order
      const compare = (a, b) => {
        if (a.createdAt > b.createdAt) {
          return -1;
        }
        if (a.createdAt > b.createdAt) {
          return 1;
        }
        return 0;
      };
      //sorting function
      Ldata.sort(compare);
      //storing sorted leaves in getLeaves hook
      setGetLeaves(Ldata);
    } catch (error) {
      console.log("error on fetching data", error);
    }
  
    }
  };
    
  //useEffect hook for fetching leaves from database  on initial run
  React.useEffect(() => {
    fetchData();
     
  }, []);
  //useEffect hook for filtering leaves for hr manager, hr and team lead module
  React.useEffect(() => {
     if(role=='hr manager'){
    const result = getLeaves.filter((leave) => {
      if (leave.Lead_Approval === "approved" || leave.employee.role === "lead") {
        return true;
      } else {
        return false;
      }
    });
    setLeaveResults(result);
  }
if(role==='hr'){
    const result = getLeaves.filter((leave) => {
      if (!leave.employee.company) {
        return false;
      } else {
        if (
          (leave.employee.company.toLowerCase() === "lads technology" &&
            leave.Lead_Approval === "approved") || leave.supervisor === hrName
        ) {
          return true;
        } else {
          return false;
        }
      }
    });
    setLeaveResults(result);
  }
if(role==='lead'){
    API.graphql(
    graphqlOperation(onCreateLeave)
).subscribe({
    next: (data) =>{ 
      console.log(getLeaves);
      setGetLeaves([...getLeaves,data.value.data.onCreateLeave]); 
      toast.success(`${data.value.data.onCreateLeave.employee.full_name} is applied for leave`, {
        position: "top-right",
        autoClose: false,
        hideProgressBar: true,
      });
    },
    error: error => console.warn(error)
});
  // filtering leave records on the basis of applicant supervisor
    const result = getLeaves.filter(
      (leave) => leave.supervisor.toLowerCase() === empName.toLowerCase()
    );
    setLeaveResults(result);
}
  }, [getLeaves]);

  //useEffect hook for filtering leave data on the basis of search
  React.useEffect(() => {
    const results = leaveResults.filter((leave) => {
      if(!searchDate){
      if (leave.employee.full_name.toLowerCase().includes(searchTerm) ) {
        return true;
      } else {
        return false;
      }
    }
    else{
     if (leave.employee.full_name.toLowerCase().includes(searchTerm) && leave.from.toLowerCase().includes(searchDate)) {
        return true;
      } else {
        return false;
      }
    }
    });
    setSearchResults(results);
  }, [searchTerm]);
  //useEffect hook for filtering leave data on the basis of search Date
  React.useEffect(() => {
    const results = leaveResults.filter((leave) => {
      if (leave.employee.full_name.toLowerCase().includes(searchTerm) && leave.from.toLowerCase().includes(searchDate)) {
        return true;
      } else {
        return false;
      }
    });
    setSearchResults(results);
  }, [searchDate]);
  //useEffect hook for notification on new leave arrival
  React.useEffect(() => {
    if(role==='hr manager'){
    if (localStorage.getItem("managerLeaves") < leaveResults.length) {
      toast.success(`${leaveResults[0].employee.full_name} is applied for leave`, {
        position: "top-right",
        autoClose: false,
        hideProgressBar: true,
      });
      //storing number of leaves in localStorage for notification purpose
      localStorage.setItem("managerLeaves", leaveResults.length);
    }
    if (
      leaveResults.length > 0 &&
      localStorage.getItem("managerLeaves") > leaveResults.length
    ) {
      localStorage.setItem("managerLeaves", leaveResults.length);
    }
    console.log(localStorage.getItem("managerLeaves"));
  }
  if(role==='hr'){
      if (localStorage.getItem("hrLeaves") < leaveResults.length) {
      toast.success(`${leaveResults[0].employee.full_name} is applied for leave`, {
        position: "top-right",
        autoClose: false,
        hideProgressBar: true,
      });
      //storing number of leaves in localStorage for notification purpose
      localStorage.setItem("hrLeaves", leaveResults.length);
    }
    if (
      leaveResults.length > 0 &&
      localStorage.getItem("hrLeaves") > leaveResults.length
    ) {
      localStorage.setItem("hrLeaves", leaveResults.length);
    }
    console.log(localStorage.getItem("hrLeaves"));
  }
  if(role==='lead'){
     if (localStorage.getItem("leadLeaves") < leaveResults.length) {
      toast.success(`${leaveResults[0].employee.full_name} is applied for leave`, {
        position: "top-right",
        autoClose: false,
        hideProgressBar: true,
      });
      //storing number of leaves in localStorage for notification purpose
      localStorage.setItem("leadLeaves", leaveResults.length);
    }
    if (
      leaveResults.length > 0 &&
      localStorage.getItem("leadLeaves") > leaveResults.length
    ) {
      localStorage.setItem("leadLeaves", leaveResults.length);
    }
    console.log(localStorage.getItem("leadLeaves"));
  }
  }, [leaveResults]);
  //edit button handler
    const handleEdit = (id,Approval) => {
  if(role==='hr manager' || role==='hr'){
    history.push(`/empLeave/${id}`);
}
if(role==='lead'){
    if (Approval === "pending") {
      history.push(`/leadLeaveEdit/${id}`);
    } else {
      window.alert("you can not edit after Hr approval/rejection");
    }
}
}
  return (
    <>
      {searchTerm ? (
        <>
          <Header />
          {/* Page content */}
          <Container className="mt--5" fluid>
            {/* Table */}
            <Row>
              <div className="col">
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <CardHeader className="border-0" style={{display:'flex',flexDirection:'row',gap:'0.2rem'}}>
                      <InputGroup
                        className="input-group-alternative"
                        style={{
                          width: "30vw",
                          boxShadow: "1px 1px 2px lightGray",
                        }}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-search" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Search by employee name "
                          type="text"
                          value={searchTerm}
                          onChange={(e) =>
                            setSearchTerm(e.target.value.toLowerCase())
                          }
                        />
                      </InputGroup>
                       <InputGroup
                        className="input-group-alternative"
                        style={{
                          width: "30vw",
                          boxShadow: "1px 1px 2px lightGray",
                        }}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-search" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="yyyy-mm"
                          type="text"
                          value={searchDate}
                          onChange={(e) =>
                            setSearchDate(e.target.value.toLowerCase())
                          }
                        />
                      </InputGroup>
                    </CardHeader>
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
                      {searchResults.map((leave, i) => {
                        return (
                          <>
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
                                  <DropdownMenu
                                    className="dropdown-menu-arrow"
                                    right
                                  >
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
                        );
                      })}
                    </tbody>
                  </Table>
                  <CardFooter className="py-4"></CardFooter>
                </Card>
              </div>
            </Row>
          </Container>
        </>
      ) : (
        <>
          <Header />
          {/* Page content */}
          <Container className="mt--5" fluid>
            {/* Table */}
            <Row>
              <div className="col">
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <CardHeader className="border-0" style={{display:'flex',flexDirection:'row',gap:'0.2rem'}}>
                      <InputGroup
                        className="input-group-alternative"
                        style={{
                          width: "30vw",
                          boxShadow: "1px 1px 2px lightGray",
                        }}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-search" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Search by employee name "
                          type="text"
                          value={searchTerm}
                          onChange={(e) =>
                            setSearchTerm(e.target.value.toLowerCase())
                          }
                        />
                      </InputGroup>
                       <InputGroup
                        className="input-group-alternative"
                        style={{
                          width: "30vw",
                          boxShadow: "1px 1px 2px lightGray",
                        }}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-search" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="yyyy-mm"
                          type="text"
                          value={searchDate}
                          onChange={(e) =>
                            setSearchDate(e.target.value.toLowerCase())
                          }
                        />
                      </InputGroup>
                    </CardHeader>
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
                      {leaveResults.map((leave, i) => {
                        return (
                          <>
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
                                  <DropdownMenu
                                    className="dropdown-menu-arrow"
                                    right
                                  >
                                    <DropdownItem
                                      href="#pablo"
                                      onClick={(e) => handleEdit(leave.id,leave.Hr_Approval)}
                                    >
                                      Edit
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </Table>
                  <CardFooter className="py-4"></CardFooter>
                </Card>
              </div>
            </Row>
          </Container>
        </>
      )}
      <ToastContainer />
    </>
  );
};

export default LeaveTables;
