import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {getEmployee} from '../../../graphql/queries'
import {API,graphqlOperation,Storage} from "aws-amplify";
import {useParams} from 'react-router';
import {useHistory} from 'react-router';
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
export const empSupervisor = [];

const UserProfile = () => {

  const history = useHistory();
 const userId=useParams().id;
const [empJobs,setEmpJobs]=React.useState([]);
const [empWarnings,setEmpWarnings]=React.useState([]);
const [empEvaluation,setEmpEvaluation]=React.useState([]);
const [employee,setEmployee] = React.useState({});

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    textTransform:'uppercase'
  },
}));

 const getUser=async()=>{
  try{

const data=await API.graphql(graphqlOperation(getEmployee,{id:userId}))
const empData = data.data.getEmployee;
setEmpJobs(empData.jobs.items);
setEmpEvaluation(empData.evaluation.items);
setEmpWarnings(empData.warnings.items);
empSupervisor.push(empData.supervisor);
setEmployee({employee_id:empData.employee_id,employee_name:empData.employee_name,
  full_name:empData.full_name,father_name:empData.father_name,cnic:empData.cnic,employee_addr:empData.employee_addr,employee_email:empData.employee_email,employee_password:empData.employee_password,employee_phone1:empData.employee_phone1,end_date:empData.end_date,employee_phone2:empData.employee_phone2,employee_pic:empData.employee_pic,employee_end:empData.employee_end,employee_salary:empData.employee_salary,role:empData.role,supervisor:empData.supervisor,company:empData.company,blood_group:empData.blood_group,transport_mode:empData.transport_mode,dob:empData.dob,vichel_no:empData.vichel_no,doj:empData.doj,status:empData.status,last_degree:empData.last_degree,institute:empData.institute});

  }
 catch(error){
console.log('hello',error);
  }
}
  React.useEffect(()=>{
getUser();
},[])

const classes = useStyles();

const clickHandler=()=>{
  history.push('/admin/team')
}
  return (
    <>
    {(!employee)?(<h1>loading</h1>):
     (
     <>
      {/* <UserHeader /> */}
      <Container className="mt-7" fluid>
          <Row>
          <Col className="order-xl-2 mb-5 mx-5 px-5 mb-xl-0" xl="11"> 
            <Card className="bg-secondary shadow">
              <div className="card-profile-image "  >
                      <img style={{height:'150px',width:'150px' , objectFit:'fit'}} src={`https://ems3425b0d312534fc887d7f1545129bee9134248-dev.s3.ap-southeast-1.amazonaws.com/public/${employee.employee_pic}`} alt="..."  className="rounded-circle " />
                  </div>
              <CardHeader className="bg-white border-0">
                
                <Row className="align-items-center" style={{height:'10vh'}}>
                   <Col className="order-lg-2" lg="2" xs='6' styled={{display:'flex',flexDirection:'column',}}>
                  
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
                       <Col lg="3" xs='6'>
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
                   
                      <Col lg="3" xs='6'>
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
                        <Col lg="3" xs='6'>
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
                     <Col lg="3" xs='6'>
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
                        <Col lg="3" xs='6'>
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
                      <Col lg="3" xs='6'>
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
                           <Col lg="3" xs='6'>
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
                    <Row className='mb-5'>
                      <Col lg="3" xs='6'>
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
                        <Col lg="3" xs='6'>
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
                        <Col lg="3" xs='6'>
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
                        <Col lg="3" xs='6'>
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
       empJobs.map((job)=>{
        
       return <AccordionDetails>
          <Typography>
            <Container>
           <Row style={{width:'60vw'}}>
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
        <div className={`${classes.root} my-2`}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
                   <Typography className={classes.heading}>Evaluation Forms {`(${empEvaluation.length})`}</Typography>
        </AccordionSummary>
         {
       empEvaluation.map((eva)=>{
        
       return <AccordionDetails>
          <Typography>
            <Container>
              <a href={`/user/${userId}/evaluation/${eva.id}`} >
           <Row style={{width:'60vw'}}>
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
      </div>
      <div className={`${classes.root} my-2`}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
                   <Typography className={classes.heading}>Warnings {`(${empWarnings.length})`}</Typography>
        </AccordionSummary>
         {
       empWarnings.map((warning)=>{
        
       return <AccordionDetails>
          <Typography>
            <Container>
           <Row style={{width:'60vw'}}>
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
      </div>
      <div>
                 <Button className='bg-primary' onClick={clickHandler} style={{marginLeft:'70vw',marginTop:'2rem'}} >Back</Button>
              </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container></>)
}
    </>
  );
};

export default UserProfile;
