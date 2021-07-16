import React from 'react'
import { Form, Button, Col, Row } from "react-bootstrap";
import {API,graphqlOperation} from "aws-amplify";
import {updateLeave} from '../../../graphql/mutations'
import {useParams} from 'react-router'
import {getLeave} from '../../../graphql/queries'
import {useHistory} from 'react-router'


const EditLeadLeave=()=> {
  const [loading,setLoading]=React.useState(false);
   const history=useHistory();
   const {id}=useParams();
   


const [leave,setLeave]=React.useState({});
React.useEffect(()=>{
   getUser();
},[])

const getUser=async()=>{
  try{
const data=await API.graphql(graphqlOperation(getLeave,{id:id}))
 const empData = data.data.getLeave;

setLeave({id:empData.id,employee_name:empData.employee.employee_name,leave:empData.EditLeadLeave,from:empData.from,to:empData.to,Hr_Approval:empData.Hr_Approval,Lead_Approval:empData.Lead_Approval,remarks:empData.remarks,type:empData.type});
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
      setLoading(false);
 history.push('/admin/LeadEmpTable');
    },3000)
     
      // window.location.reload();
 }
   const updateUser=async ()=>{
  try{
    const updateData={id:leave.id,from:leave.from,to:leave.to,leave:leave.leave,remarks:leave.remarks,Hr_Approval:leave.Hr_Approval,Lead_Approval:leave.Lead_Approval,type:leave.type};
     await API.graphql(graphqlOperation(updateLeave,{input:updateData}))
     console.log('operation successful');
  }
  catch(error){
    console.log(error);
  }
}

const cancelHandler=()=>{
   history.push('/admin/LeadEmpTable');
 }
    return (<>
        <div>
        <h1 id="role-form-title" className="m-2 p-3">Update Details</h1>
        <div id="role-form-outer-div" className="mx-5 px-5">
          <Form id="form" >
              {/* <Form.Group as={Row}>
              <Form.Label column sm={2}>
               Leave Id
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Employee Id"
                  value={leave.id}
                  // onChange={(e)=>setLeave({...leave,id:parseInt(e.target.value)})}
                  disabled
                  required
                />
              </Col>
            </Form.Group> */}
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
               Employee Name
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Employee Name"
                  value={leave.employee_name}
                  // onChange={(e)=>setLeave({...leave,employee_id:parseInt(e.target.value)})}
                  disabled
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} >
              <Form.Label column sm={2}>
              Leave
             </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" onChange={(e)=>setLeave({...leave,leave:e.target.value})} disabled required>
                   {/* <option value="admin">Admin</option>  */}
                   <option value="half leave">Half Leave</option>
                  <option value="Full Leave">Full Leave</option>
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
                  // onChange={(e)=>setLeave({...leave,from:e.target.value})}
                  required
                  disabled
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
                  // onChange={(e)=>setLeave({...leave,to:e.target.value})}
                  required
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} >
              <Form.Label column sm={2}>
               Hr Approval
             </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control value={leave.Hr_Approval} as="select" onChange={(e)=>setLeave({...leave,Hr_Approval:e.target.value})} required disabled>
                   {/* <option value="admin">Admin</option>  */}
                   <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} >
              <Form.Label column sm={2}>
                Lead Approval
             </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control value={leave.Lead_Approval} as="select" onChange={(e)=>setLeave({...leave,Lead_Approval:e.target.value})} required>
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
                  placeholder="remarks"
                  value={leave.remarks}
                  onChange={(e)=>setLeave({...leave,remarks:e.target.value})}
                  required
                />
              </Col>
            </Form.Group>
             <Form.Group as={Row}>
              <Form.Label column sm={2}>
               Type
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="type"
                  value={leave.type}
                  // onChange={(e)=>setLeave({...leave,type:e.target.value})}
                  required
                  disabled
                />
              </Col>
            </Form.Group>
           
            <div className='px-5'  style={{display:'flex',flexDirection:'row',gap:'3vw',marginLeft:'13vw'}}>
            <Form.Group as={Row} id="form-submit-button" >
              <Col sm={{ span: 10, offset:2}}>
                 <Button disabled={loading?'true':''}  onClick={clickHandler}>Update</Button>
              </Col>
            </Form.Group>
            <Form.Group as={Row} id="form-submit-button" >
              <Col sm={{ span: 10, offset:2}} >
                 <Button className='bg-light' disabled={loading?'true':''}   onClick={cancelHandler}>Cancel</Button>
              </Col>
            </Form.Group>
            </div>
          </Form>
      </div>
</div>
   </> )
}

export default EditLeadLeave;
