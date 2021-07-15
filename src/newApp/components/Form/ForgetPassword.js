import React from 'react'
import { Auth } from 'aws-amplify';
import { Form, Button, Col, Row } from "react-bootstrap";


const ForgetPassword=()=>{
    const [userId,setuserId]=React.useState('');
    const [err,setErr]=React.useState('');
    const onChange=(e)=>{
    e.persist();
    setuserId(e.target.value);
  }
// Send confirmation code to user's email


    const clickHandler=(e)=>{
      e.preventDefault();
  Auth.forgotPassword(userId)
    .then(data => console.log(data))
    .catch(err => {
  setErr(err.message)
   window.setTimeout(()=>{
   setErr('')
   },5000)
    });
    }
// Collect confirmation code and new password, then
// Auth.forgotPasswordSubmit(username, code, new_password)
//     .then(data => console.log(data))
//     .catch(err => {
//           setErr(err.message)
//    window.setTimeout(()=>{
// setErr('')
//    },5000)
//     });

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
                  name='username'
                  placeholder="user id"
                  value={userId}
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

export default ForgetPassword;