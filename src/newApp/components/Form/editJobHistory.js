import React from 'react'
import { Form, Button, Col, Row } from "react-bootstrap";
import {API,graphqlOperation} from "aws-amplify";
import {updateJob} from '../../../graphql/mutations'
import {useParams} from 'react-router'
import {getJob} from '../../../graphql/queries'
import {useHistory} from 'react-router'


const EditJobHistory=()=> {
  const [loading,setLoading]=React.useState(false);
   const history=useHistory();
   const {id,jobId}=useParams();
const [job,setJob]=React.useState({id:'',strat_date:'',end_Date:'',designation:'',organization:''});
React.useEffect(()=>{
   getUser();
},[])

const getUser=async()=>{
  try{
const data=await API.graphql(graphqlOperation(getJob,{id:jobId}))
 const jobData = data.data.getJob;
setJob({id:jobData.id,start_date:jobData.start_date,end_date:jobData.end_date,designation:jobData.designation,organization:jobData.organization});
  }
 catch(error){
console.log('error',error);
  }
}

 const clickHandler=(e)=>{
      e.preventDefault();
      updateUser();
      setLoading(true);
      window.setTimeout(()=>{
          history.push(`/editjobhistory/${id}`);
          setLoading(false);
      },3000)
      
      // window.location.reload();
 }
   const updateUser=async ()=>{
  try{
    const updateData={id:job.id,start_date:job.start_date,end_date:job.end_date,designation:job.designation,organization:job.organization};
     await API.graphql(graphqlOperation(updateJob,{input:updateData}))
     console.log('operation successful');
  }
  catch(error){
    console.log(error);
  }
}

 const cancelHandler=()=>{
   history.push(`/editjobhistory/${id}`);
 }
    return (<>
        <div>
        <h1 id="role-form-title" className="m-2 p-3">Update Details</h1>
        <div id="role-form-outer-div" className="mx-5 px-5">
          <Form id="form" >
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
               Start Date
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="date"
                  placeholder="date"
                  value={job.start_date}
              onChange={(e)=>setJob({...job,stsrt_date:e.target.value})}
                  required
                />
              </Col>
            </Form.Group>
             <Form.Group as={Row}>
              <Form.Label column sm={2}>
               End Date
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="date"
                  placeholder="date"
                  value={job.end_date}
                  onChange={(e)=>setJob({...job,end_date:e.target.value})}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
              Designation
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="designation"
                  value={job.designation}
                   onChange={(e)=>setJob({...job,designation:e.target.value})}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
              Organization
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="organization"
                  placeholder="organization"
                  value={job.organization}
                   onChange={(e)=>setJob({...job,organization:e.target.value})}
                  required
                />
              </Col>
            </Form.Group>
          
           
            <div className='px-5'   style={{display:'flex',flexDirection:'row',gap:'3vw',marginLeft:'13vw'}}>
            <Form.Group as={Row} id="form-submit-button" >
              <Col sm={{ span: 10, offset:2}}>
                 <Button disabled={loading?'true':''} onClick={clickHandler}>Update</Button>
              </Col>
            </Form.Group>
            <Form.Group as={Row} id="form-submit-button" >
              <Col sm={{ span: 10, offset:2}} >
                 <Button className='bg-light' disabled={loading?'true':''} onClick={cancelHandler}>Cancel</Button>
              </Col>
            </Form.Group>
            </div>
          </Form>
      </div>
</div>
   </> )
}


export default EditJobHistory;
