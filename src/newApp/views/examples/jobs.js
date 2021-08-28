import React from "react";
 import {useParams} from 'react-router'
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
  UncontrolledTooltip,
} from "reactstrap";
import 'react-bootstrap';
// core components
import Header from "../../components/Headers/Header";
 import {API,graphqlOperation} from "aws-amplify";
import {getEmployee} from '../../../graphql/queries'
import {useHistory} from 'react-router'

const Jobs = () => {
    const userId=useParams().id;
  const history=useHistory();
  const [jobs,setJobs]=React.useState([]);
React.useEffect(()=>{
       fetchJobs();
      
    },[]);

    const fetchJobs=async()=>{
const data=await API.graphql(graphqlOperation(getEmployee,{id:userId}))
const empData = data.data.getEmployee.jobs;
if(empData){
setJobs(empData.items)
}
else{
console.log('there is no job present');
}
  }


const handleEdit =(id)=>{
history.push(`/editjob/${userId}/${id}`);
}
const clickHandler = ()=>{
    history.push(`/jobHistory/${userId}`)
}
const backHandler = ()=>{
    history.push('/admin/team')
}
  return (
    <>
      <Header />
      <Container className="mt--5" fluid>
        <Row>
          <div className="col" >
             <h1 class='text-white ml-5 font-weight-bolder'>Job History</h1>
            <Card className="shadow">
              <CardHeader className="border-5" style={{display:'flex',flexDirection:'row',position:'relative'}}>
                <button id='button1' class="btn btn-white mx-2" type="submit" onClick={clickHandler}><i class="fa fa-plus"  aria-hidden="true"></i></button>
                <UncontrolledTooltip
                  style={{ backgroundColor: "rgba(255, 255, 0, 0.5)",color:'black' }}
                  placement="right"
                  target="button1"
                >
                  Add new Job
                </UncontrolledTooltip>
                 <button class="btn btn-primary mx-2" type="submit" style={{position:'absolute',right:'5px'}} onClick={backHandler}>Back</button>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                    <th scope="col">Organization</th>
                    <th scope="col">Designation</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {
                 jobs.map((job,i)=>{
              return (<>
              
               <tr >
                    <td>{job.start_date}</td>
                    <td>{job.end_date}</td>
                    <td>{job.organization}</td>
                    <td>{job.designation}</td>
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
                            onClick={(e) => handleEdit(job.id)}
                          >
                            Edit job
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

export default Jobs;
