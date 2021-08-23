import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { API, graphqlOperation } from "aws-amplify";
import { listLeaves, getEmployee } from "../../../graphql/queries";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { roleArr } from '../../../App';
//importing Hr full name field from app.js
import { emp_full_name } from "../../../App";
//importing id from app
import { id } from "../../../App";
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Container,
  Row,
  Col,
} from "reactstrap";
import UserHeader from "../../components/Headers/UserHeader";
export const empSupervisor = [];


const Profile = () => {
  //
  //******Leave section******//
  //
  //useState hooks used in this program
  const [leaveResults, setLeaveResults] = React.useState([]);
  const [getLeaves, setGetLeaves] = React.useState([]);
  const [empName, setEmpName] = React.useState("");
  //assinging hr full name to variable
  const hrName = emp_full_name[emp_full_name.length - 1];
  //assigning userId
  const userId = id[id.length - 1];
  //assinging role to variable
  const role = roleArr[roleArr.length - 1];
  //function for fetching leave data from database

  const fetchData = async () => {
    if (role === 'hr' || role === 'hr manager') {
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
    if (role === 'lead') {
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
  //useEffect hook for filtering leaves for hr manager, hr and team lead module
  React.useEffect(() => {
    if (role == 'hr manager') {
      const result = getLeaves.filter((leave) => {
        if (leave.Lead_Approval === "approved" || leave.employee.role === "lead") {
          return true;
        } else {
          return false;
        }
      });
      setLeaveResults(result);
      console.log(result);
    }
    if (role === 'hr') {
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
      console.log(result);
    }
    if (role === 'lead') {
      // filtering leave records on the basis of applicant supervisor
      const result = getLeaves.filter(
        (leave) => leave.supervisor.toLowerCase() === empName.toLowerCase()
      );
      setLeaveResults(result);
      console.log(result)
      console.log(result);
    }
  }, [getLeaves]);
  //useEffect hook for notification on new leave arrival
  React.useEffect(() => {
    if (role === 'hr manager') {
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
    if (role === 'hr') {
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
    if (role === 'lead') {
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
  //
  //******profile section******//
  //
  const [empJobs, setEmpJobs] = React.useState([]);
  const [empWarnings, setEmpWarnings] = React.useState([]);
  const [employee, setEmployee] = React.useState({});
  const [empEvaluation, setEmpEvaluation] = React.useState([]);

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
      textTransform: 'uppercase'
    },
  }));

  const getUser = async () => {
    try {

      const data = await API.graphql(graphqlOperation(getEmployee, { id: userId }))
      const empData = data.data.getEmployee;
      setEmpJobs(empData.jobs.items);
      setEmpEvaluation(empData.evaluation.items);
      setEmpWarnings(empData.warnings.items);
      empSupervisor.push(empData.supervisor);
      setEmployee({
        employee_id: empData.employee_id, employee_name: empData.employee_name,
        full_name: empData.full_name, father_name: empData.father_name, cnic: empData.cnic, employee_addr: empData.employee_addr, employee_email: empData.employee_email, employee_password: empData.employee_password, employee_phone1: empData.employee_phone1, employee_phone2: empData.employee_phone2, employee_pic: empData.employee_pic, employee_salary: empData.employee_salary, role: empData.role, supervisor: empData.supervisor, company: empData.company, blood_group: empData.blood_group, transport_mode: empData.transport_mode, dob: empData.dob, vichel_no: empData.vichel_no, doj: empData.doj, status: empData.status, last_degree: empData.last_degree, institute: empData.institute
      });

    }
    catch (error) {
      console.log('hello', error);
    }
  }
  React.useEffect(() => {
    getUser();
    fetchData();
  }, [])

  React.useEffect(() => {
    if (localStorage.getItem("warnings") < empWarnings.length) {
      toast.warning('there is new warning for you', {
        position: "top-right",
        autoClose: false,
        hideProgressBar: true,
      });
      //storing number of leaves in localStorage for notification purpose
      localStorage.setItem("warnings", empWarnings.length);
    }
    if (
      empWarnings.length > 0 &&
      localStorage.getItem("warnings") > empWarnings.length
    ) {
      localStorage.setItem("warnings", empWarnings.length);
    }
    console.log(localStorage.getItem("warnings"));
  }, [empWarnings])

  React.useEffect(() => {
    if (localStorage.getItem("evaluation") < empEvaluation.length) {
      toast.success('there is new Evaluation form for you', {
        position: "top-right",
        autoClose: false,
        hideProgressBar: true,
      });
      //storing number of leaves in localStorage for notification purpose
      localStorage.setItem("evaluation", empEvaluation.length);
    }
    if (
      empEvaluation.length > 0 &&
      localStorage.getItem("evaluation") > empEvaluation.length
    ) {
      localStorage.setItem("evaluation", empEvaluation.length);
    }
    console.log(localStorage.getItem("evaluation"));
  }, [empEvaluation]);


  const classes = useStyles();

  return (
    <>
      {(!employee) ? (<h1>loading</h1>) :
        (<> <UserHeader />
          <Container className="mt--7" fluid>
            <Row>
              <Col className="order-xl-2 mb-5 mb-xl-0" xl="12" xs='12'>
                <Card className="bg-secondary shadow">
                  <div className="card-profile-image "  >
                    <img style={{ height: '150px', width: '150px', objectFit: 'fit' }} src={`https://ems3425b0d312534fc887d7f1545129bee970119-production.s3.eu-west-1.amazonaws.com/public/${employee.employee_pic}`} alt="..." className="rounded-circle " />
                  </div>
                  <CardHeader className="bg-white border-0">

                    <Row className="align-items-center" style={{ height: '10vh' }}>
                      <Col className="order-lg-2" lg="2" xs='6' styled={{ display: 'flex', flexDirection: 'column', }}>

                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Form className='my-5'>
                      <div className="pl-lg-4">
                        <Row className='mb-5 my-5'>
                          <Col lg="3" xs='6'>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                user id
                              </label>
                              <p>{employee.employee_name}</p>
                            </FormGroup>
                          </Col>
                          <Col lg="3" xs='6'>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-email"
                              >
                                Email address
                              </label>
                              <p>{employee.employee_email}</p>
                            </FormGroup>
                          </Col>
                          <Col lg="3" xs='6'>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                              >
                                Address
                              </label>
                              <p>{employee.employee_addr}</p>
                            </FormGroup>
                          </Col>
                          <Col lg="3" xs='6'>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Full Name
                              </label>
                              <p>{employee.full_name}</p>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className='mb-5 my-5'>
                          <Col lg="3" xs='6'>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-email"
                              >
                                Father Name
                              </label>
                              <p>{employee.father_name}</p>
                            </FormGroup>
                          </Col>
                          <Col lg="3" xs='6'>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                              >
                                CNIC
                              </label>
                              <p>{employee.cnic}</p>
                            </FormGroup>
                          </Col>
                          <Col lg="3" xs='6'>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                              >
                                Phone#1
                              </label>
                              <p>{employee.employee_phone1}</p>
                            </FormGroup>
                          </Col>
                          <Col lg='3' xs='6'>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                              >
                                Phone#2
                              </label>
                              <p>{employee.employee_phone2}</p>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className='mb-5'>

                          <Col lg='3' xs='6'>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                              >
                                Company
                              </label>
                              <p>{employee.company}</p>
                            </FormGroup>
                          </Col>
                          <Col lg='3' xs='6'>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                              >
                                Date of Birth
                              </label>
                              <p>{employee.dob}</p>
                            </FormGroup>
                          </Col>
                          <Col lg='3' xs='6'>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                              >
                                Date of joining
                              </label>
                              <p>{employee.doj}</p>
                            </FormGroup>
                          </Col>
                          <Col lg='3' xs='6'>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                              >
                                Status
                              </label>
                              <p>{employee.status}</p>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className='mb-5'>

                          <Col lg='3' xs='6'>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                              >
                                Left Date
                              </label>
                              <p>{employee.end_date}</p>
                            </FormGroup>
                          </Col>
                          <Col lg='3' xs='6'>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                              >
                                Last Degree
                              </label>
                              <p>{employee.last_degree}</p>
                            </FormGroup>
                          </Col>
                          <Col lg='3' xs='6'>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                              >
                                Institute/ University
                              </label>
                              <p>{employee.institute}</p>
                            </FormGroup>
                          </Col>
                          <Col lg='3' xs='6'>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                              >
                                Transport Mode
                              </label>
                              <p>{employee.transport_mode}</p>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className='mb-5' xs='6'>

                          <Col lg='3' xs='6'>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                              >
                                Vehicle Number
                              </label>
                              <p>{employee.vichel_no}</p>
                            </FormGroup>
                          </Col>
                          <Col lg='3' xs='6'>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                              >
                                Blood Group
                              </label>
                              <p>{employee.blood_group}</p>
                            </FormGroup>
                          </Col>
                          <Col lg='3' xs='6'>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                              >
                                Designation
                              </label>
                              <p>{employee.role}</p>
                            </FormGroup>
                          </Col>
                          <Col lg='3' xs='6'>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                              >
                                Supervisor
                              </label>
                              <p>{employee.supervisor}</p>
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                      <hr className="my-4" />
                      {/* Address */}

                      <div className={classes.root}>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography className={classes.heading}>Job History {`(${empJobs.length})`}</Typography>
                          </AccordionSummary>
                          {
                            empJobs.map((job) => {

                              return <AccordionDetails>
                                <Typography>
                                  <Container>
                                    <Row style={{ width: '60vw' }}>
                                      <Col md="3">
                                        <FormGroup>
                                          <label
                                            className="form-control-label"
                                            htmlFor="input-address"
                                          >
                                            Organization
                                          </label>
                                          <p>{job.organization}</p>
                                        </FormGroup>
                                      </Col>
                                      <Col lg="3">
                                        <FormGroup>
                                          <label
                                            className="form-control-label"
                                            htmlFor="input-city"
                                          >
                                            Designation
                                          </label>
                                          <p>{job.designation}</p>
                                        </FormGroup>
                                      </Col>
                                      <Col lg="3">
                                        <FormGroup>
                                          <label
                                            className="form-control-label"
                                            htmlFor="input-country"
                                          >
                                            Start Date
                                          </label>
                                          <p>{job.start_date}</p>
                                        </FormGroup>
                                      </Col>
                                      <Col lg="3">
                                        <FormGroup>
                                          <label
                                            className="form-control-label"
                                            htmlFor="input-country"
                                          >
                                            End Date
                                          </label>
                                          <p>{job.end_date}</p>
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                  </Container>
                                </Typography>
                              </AccordionDetails>
                            })
                          }
                        </Accordion>
                      </div>
                      {
                        employee.role !== 'owner' && (<div className={`${classes.root} my-2`}>
                          <Accordion>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography className={classes.heading}>Evaluation Forms {`(${empEvaluation.length})`}</Typography>
                            </AccordionSummary>
                            {
                              empEvaluation.map((eva) => {
                                return <AccordionDetails>
                                  <Typography>
                                    <Container>
                                      <a href={`/user/${userId}/evaluation/${eva.id}`} >
                                        <Row style={{ width: '60vw' }}>
                                          <Col md="6">
                                            <FormGroup>
                                              <p>{eva.employee_name}</p>
                                            </FormGroup>
                                          </Col>
                                          <Col lg="6">
                                            <FormGroup>
                                              <p>{eva.reviewing_date}</p>
                                            </FormGroup>
                                          </Col>
                                        </Row>
                                      </a>
                                    </Container>
                                  </Typography>
                                </AccordionDetails>
                              })
                            }
                          </Accordion>
                        </div>)
                      }
                      {
                        employee.role !== 'owner' && (<div className={`${classes.root} my-2`}>
                          <Accordion>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography className={classes.heading}>Warnings {`(${empWarnings.length})`}</Typography>
                            </AccordionSummary>
                            {
                              empWarnings.map((warning) => {
                                return <AccordionDetails>
                                  <Typography>
                                    <Container>
                                      <Row style={{ width: '60vw' }}>
                                        <Col md="4">
                                          <FormGroup>
                                            <p>{warning.date}</p>
                                          </FormGroup>
                                        </Col>
                                        <Col lg="4">
                                          <FormGroup>
                                            <p>{warning.type}</p>
                                          </FormGroup>
                                        </Col>
                                        <Col lg="4">
                                          <FormGroup>
                                            <p>{warning.description}</p>
                                          </FormGroup>
                                        </Col>
                                      </Row>
                                    </Container>
                                  </Typography>
                                </AccordionDetails>
                              })
                            }
                          </Accordion>
                        </div>)
                      }
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container></>)
      }
      <ToastContainer />
    </>
  );
};

export default Profile;
