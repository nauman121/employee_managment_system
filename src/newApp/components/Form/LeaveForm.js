import React from 'react'
import { Form, Button, Col, Row } from "react-bootstrap";
import {API,graphqlOperation} from "aws-amplify";
import {createLeave} from '../../../graphql/mutations';
import {useHistory} from 'react-router'
import {id} from '../../../App'
import { empSupervisor } from '../../../App';
import '../../../Login.css'

const LeaveForm=()=> {
  const [loading,setLoading]=React.useState(false);
    const [Err,setErr]=React.useState(false);
  const superv = empSupervisor[empSupervisor.length-1] ;
  console.log('super',superv);
  const userId=id[id.length-1];
    const history=useHistory();
const [leave,setLeave]=React.useState({employee_id:userId,leave:'half leave',from:'',to:'',Hr_Approval:'pending',Lead_Approval:'pending',remarks:'N/A',type:'sick',supervisor:superv,alert:false})

 const creatLeave=async ()=>{

  try{
     await API.graphql(graphqlOperation(createLeave,{input:leave}))
     console.log('operation successful');
  }
  catch(error){
    console.log(error);
  }
}

const clickHandler=async (e)=>{
      e.preventDefault();
      if(leave.from && leave.to){
        if(leave.from<=leave.to ){
        creatLeave();
        setLoading(true);
        window.setTimeout(()=>{
        setLoading(false);
         history.push('/admin/Empleaves');  
        },3000) 
       }
    else{
    setErr(true);
      }
      }
      else{
         setErr(true);
    }
  }
  
  const cancelHandler=()=>{
   history.push('/admin/leaves');
 }
    return (<>
        <div>
        <h1 id="role-form-title" className="m-2 p-3">Leave Form</h1>
        <div id="role-form-outer-div" className="mx-5 px-5">
          <Form id="form" >
            <Form.Group as={Row} >
              <Form.Label column sm={2}>
              Leave
             </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" onChange={(e)=>setLeave({...leave,leave:e.target.value})} required>
                   <option value="half leave">Half Leave</option>
                  <option value="full leave">Full Leave</option>
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
               From
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="date"
                  placeholder="Date"
                  value={leave.from}
                  onChange={(e)=>setLeave({...leave,from:e.target.value})}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
               To
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="date"
                  placeholder="Date"
                  value={leave.to}
                  onChange={(e)=>setLeave({...leave,to:e.target.value})}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} >
              <Form.Label column sm={2}>
              Lead Approval
             </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" onChange={(e)=>setLeave({...leave,Hr_Approval:e.target.value})} required disabled>
                   {/* <option value="admin">Admin</option>  */}
                   <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} >
              <Form.Label column sm={2}>
              Hr Approval
             </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" onChange={(e)=>setLeave({...leave,Hr_Approval:e.target.value})} required disabled>
                   {/* <option value="admin">Admin</option>  */}
                   <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </Form.Control>
              </Col>
            </Form.Group>
             <Form.Group as={Row}>
              <Form.Label column sm={2}>
              Remarks
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Hr remarks"
                  value={leave.remarks}
                  required
                  disabled
                />
              </Col>
            </Form.Group>
             <Form.Group as={Row} >
              <Form.Label column sm={2}>
                Type
             </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" onChange={(e)=>setLeave({...leave,type:e.target.value})} required>
                   <option value="sick">Sick</option>
                  <option value="urgent work">Urgent Work</option>
                </Form.Control>
              </Col>
            </Form.Group>
            <div className='px-5'  style={{display:'flex',flexDirection:'row',gap:'3vw',marginLeft:'13vw'}}>
            <Form.Group as={Row} id="form-submit-button" >
              <Col sm={{ span: 10, offset:2}}>
                 <Button disabled={loading?'true':''}  onClick={clickHandler}>Submit</Button>
              </Col>
            </Form.Group>
            <Form.Group as={Row} id="form-submit-button" >
              <Col sm={{ span: 10, offset:2}} >
                 <Button className='bg-light' disabled={loading?'true':''}  onClick={cancelHandler}>Cancel</Button>
              </Col>
            </Form.Group>
            </div>
             {Err && (<p className="alert">Error in filling the form !</p>)}
          </Form>
      </div>
</div>
   </> )
}

export default LeaveForm;
