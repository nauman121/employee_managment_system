import React from 'react'
import { Form, Button, Col, Row } from "react-bootstrap";
import {Input } from 'reactstrap';
import {API,graphqlOperation} from "aws-amplify";
import {createWarning} from '../../../graphql/mutations';
import {useHistory} from 'react-router'
import '../../../Login.css'
import {useParams} from 'react-router'

function Warning() {
  const [loading,setLoading]=React.useState(false);
     const [Err,setErr]=React.useState(false);
const id=useParams().id;
    const history=useHistory();
const [data,setData]=React.useState({employee_id:id,date:'',type:'warning',description:''})

 const creatLeave=async ()=>{

  try{
     await API.graphql(graphqlOperation(createWarning,{input:data}))
     console.log('operation successful');
  }
  catch(error){
    setErr(true);
  }
}

const clickHandler=async (e)=>{
      e.preventDefault();
      if(data.employee_id && data.date && data.type && data.description){
        creatLeave();
        setLoading(true);
         window.setTimeout(()=>{
         setLoading(false);
  history.push('/admin/team');
  },3000)
      }
      else{
         setErr(true);
    }
  }
  
  const cancelHandler=()=>{
   history.push('/admin/team');
 }
    return (<>
        <div>
        <h1 id="role-form-title" className="m-2 p-3">Warning Form</h1>
        <div id="role-form-outer-div" className="mx-5 px-5">
          <Form id="form" > 
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Date
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="date"
                  placeholder="Date"
                  value={data.date}
                  onChange={(e)=>setData({...data,date:e.target.value})}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} >
              <Form.Label column sm={2}>
             Type
             </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" onChange={(e)=>setData({...data,type:e.target.value})} required>
                   <option value="warning">Warning</option>
                  <option value="counselling">Counselling</option>
                </Form.Control>
              </Col>
            </Form.Group>
             <Form.Group as={Row}>
              <Form.Label column sm={2}>
              Description
              </Form.Label>
              <Col sm={10} className="form-input">
                <Input
                  type="textarea"
                  rows='5'
                  placeholder="Description"
                  value={data.description}
                  onChange={(e)=>setData({...data,description:e.target.value})}
                  required
                />
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

export default Warning

