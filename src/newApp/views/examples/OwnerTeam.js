import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {useHistory} from 'react-router'
import Header from "../../components/Headers/Header";
 import {API,graphqlOperation} from "aws-amplify";
import {listEmployees} from '../../../graphql/queries'
import {name} from '../../../App'
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
 
  Table,
  Container,
  Row,
  
    // UncontrolledTooltip,
} from "reactstrap";
import { Col} from "react-bootstrap";
import 'react-bootstrap';
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
// core components

const OwnerTeam = () => {
   const history=useHistory();
    const [lads,setLads]=React.useState('');
    const [canz,setCanz]=React.useState('');
const userName=name[name.length-1];
const [getEmployee,setGetEmployee]=React.useState([]);
 const [searchResults, setSearchResults] = React.useState([]);

React.useEffect(()=>{
       fetchData();
    },[]);

    const fetchData= async ()=>{
  try{ 
       const EmployeeData = await API.graphql(graphqlOperation(listEmployees));
      const EmpData = EmployeeData.data.listEmployees.items;
 setGetEmployee(EmpData);

//   setSearchResults(EmpData);
  }
  catch(error){
    console.log('error on fetching data',error);
  }
    }
React.useEffect(()=>{
 const results = getEmployee.filter(person =>
      person.role.toLowerCase()==='lead'
)
    setSearchResults(results);
    const res1= getEmployee.filter(person =>
      person.company.toLowerCase().includes('lads')
)
setLads(res1.length);
    const res2= getEmployee.filter(person =>
      person.company.toLowerCase().includes('canz')
)
setCanz(res2.length);
},[getEmployee])

   const classes = useStyles();
  return (
    <>
      <Header />
      <div className={classes.root} className='mt--5'>
          {
              searchResults.map((lead,i)=>{
                     var count = getEmployee.filter(person=>person.supervisor.toLowerCase() === lead.full_name.toLowerCase() || person.full_name.toLowerCase()===lead.full_name);
                  return  <Accordion className='my-2'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
            <div style={{display:'flex',flexDirection:'row',gap:'4vw'}}>
              <div style={{display:'flex',flexDirection:'column',gap:'1vw'}}>
          <Typography className={classes.heading}>lead name:  <a href={`/user/${lead.id}`}>{lead.full_name}</a></Typography>
           <Typography >Members: {count.length}</Typography>
           </div>
              <div style={{display:'flex',flexDirection:'column',gap:'1vw'}}>
          <Typography ><a href={`/evaluationform/${lead.id}`}>Evaluation Form</a> </Typography>
          <Typography >Organization: {lead.company}</Typography>
          </div>
          </div>
          
        </AccordionSummary>
        <AccordionDetails className='bg-white'>
        {/* Table */}
        <Container>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-5" style={{display:'flex',flexDirection:'row'}}>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
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
                    <th scope="col">Status</th>
                    <th scope="col">Left Date</th>
                    <th scope="col">Last Degree</th>
                    <th scope="col">Institute</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {
                count.map((team)=>{
                  
                    return (<>
               <tr >
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
                            src={`https://ems3425b0d312534fc887d7f1545129bee970119-production.s3.eu-west-1.amazonaws.com/public/${team.employee_pic}`}/>
                         </a>
                        <Media>
                        </Media>
                      </Media>
                    </th> 
                    <td style={{fontSize:'12px'}}>{team.employee_name}</td>
                    <td style={{fontSize:'12px'}}>{team.full_name}</td>
                    <td style={{fontSize:'12px'}}>{team.father_name}</td>
                    <td style={{fontSize:'12px'}}>{team.cnic}</td>
                    <td style={{fontSize:'12px'}}>{team.employee_email}</td>
                    <td style={{fontSize:'12px'}}>{team.employee_phone1}</td>
                    <td style={{fontSize:'12px'}}>{team.employee_phone2}</td>
                    <td style={{fontSize:'12px'}}>{team.employee_addr}</td>
                    <td style={{fontSize:'12px'}}>{team.role}</td>
                    <td style={{fontSize:'12px'}}>{team.supervisor}</td>
                    <td style={{fontSize:'12px'}}>{team.employee_salary}</td>
                    <td style={{fontSize:'12px'}}>{team.company}</td>
                    <td style={{fontSize:'12px'}}>{team.blood_group}</td>
                    <td style={{fontSize:'12px'}}>{team.transport_mode}</td>
                    <td style={{fontSize:'12px'}}>{team.vichel_no}</td>
                    <td style={{fontSize:'12px'}}>{team.dob}</td>
                    <td style={{fontSize:'12px'}}>{team.doj}</td>
                    <td style={{fontSize:'12px'}}>{team.status}</td>
                    <td style={{fontSize:'12px'}}>{team.end_date}</td>
                    <td style={{fontSize:'12px'}}>{team.last_degree}</td>
                    <td style={{fontSize:'12px'}}>{team.institute}</td>
                    <td className="text-right" style={{width:'10px'}}>
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
        </AccordionDetails>
      </Accordion>
              })
    
}
<Row>
<Col sm={6} className=''></Col>
<Col sm={5} style={{padding:'3vw',border:'1px solid lightGray',marginBottom:'2vh'}}>
<p><span style={{fontWeight:'bold'}}>Employees Of Lads Technologies : </span>{lads}</p>
<p><span style={{fontWeight:'bold'}}>Employees Of Canz Studios : </span>{canz}</p>
<p><span style={{fontWeight:'bold'}}>Total Employees : </span>{canz+lads}</p>
</Col>
<Col sm={1} className=''></Col>
</Row>

    </div>
    
    </>
  );
};

export default OwnerTeam;
