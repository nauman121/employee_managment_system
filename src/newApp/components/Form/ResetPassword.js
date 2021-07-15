import React from 'react'
import { Auth } from 'aws-amplify';
import { Form, Button, Col, Row } from "react-bootstrap";

function ResetPassword() {
const [user,setUser]=React.useState({name:'',code:'',new_password:''});
const [err,setErr]=React.useState('');
const clickHandler=(e)=>{
    e.preventDefault();
   // Collect confirmation code and new password, then
Auth.forgotPasswordSubmit(user.name,user.code, user.new_password)
    .then(data => console.log(data))
    .catch(err => {
    setErr(err.message)
   window.setTimeout(()=>{
setErr('')
   },5000)
    });
}
 

 const onChange=(e)=>{
e.persist();
setUser({...user,[e.target.name]:e.target.value})
 }

   return (<>
    <h1 id="role-form-title" className="m-2 p-3">Add User Id</h1>
        <div id="role-form-outer-div" className="mx-5 px-5">
    <Form id="form" >
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
               user id
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  name='name'
                  placeholder="user id"
                  value={user.name}
                  onChange={onChange}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
               code
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  name='code'
                  placeholder="code"
                  value={user.code}
                  onChange={onChange}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
              new password
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  name='new_password'
                  placeholder="new password"
                  value={user.new_password}
                  onChange={onChange}
                  required
                />
              </Col>
            </Form.Group>
             <div className='px-5'  style={{display:'flex',flexDirection:'row',gap:'3vw',marginLeft:'13vw'}}>
               <p className="alert">{err}</p>
            <Form.Group as={Row} id="form-submit-button" >
              <Col sm={{ span: 10, offset:2}}>
                <Button  onClick={clickHandler}>Submit</Button>
              </Col>
            </Form.Group>
            </div>
    </Form>
    </div>
    </>)
}

export default ResetPassword;

