import React,{useState} from 'react'
import { Form, Button, Col, Row } from "react-bootstrap";
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router';

const ChangingPassword=()=>{

    const [err,setErr]=useState('');
       const [loading,setLoading]=useState(false);
    const history = useHistory();
    const [changes,setChanges]= useState({oldPassword:'',newPassword:''})


  const  clickHandler=(e)=>{
       e.persist();
Auth.currentAuthenticatedUser()
    .then(user => {
        return Auth.changePassword(user, changes.oldPassword, changes.newPassword);
    })
    .then(data =>{ 
         setLoading(true);
        window.setTimeout(()=>{
            setLoading(false);
             history.push('/');
        },3000)
    })
    .catch(err => {
       setErr(err.message);
       window.setTimeout(()=>{
             setErr('');
        },3000)
    });
  }
  const onChange=(e)=>{
 setChanges({...changes,[e.target.name]:e.target.value});
  }

  const cancelHandler=()=>{
       history.push('/');
  }

      return (
        <>
        <div>
          <h1 id="role-form-title" className="m-2 p-3">Changing Password</h1>
        <div id="role-form-outer-div" className="mx-5 px-5">
          <Form id="form" >
         <Form.Group as={Row}>
              <Form.Label column sm={2}>
               old password
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="password"
                  name='oldPassword'
                  placeholder="old password"
                  value={changes.oldPassword}
                  onChange={onChange}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
               New Password
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="password"
                  name='newPassword'
                  placeholder="new password"
                  value={changes.newPassword}
                  onChange={onChange}
                  required
                />
              </Col>
            </Form.Group>

            <div className='px-5'  style={{display:'flex',flexDirection:'row',gap:'3vw',marginLeft:'13vw'}}>
               <p className="alert">{err}</p>
            <Form.Group as={Row} id="form-submit-button" >
              <Col sm={{ span: 10, offset:2}}>
                <Button disabled={loading?'true':''} onClick={clickHandler}>submit</Button>
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
        </>
    )
}

export default ChangingPassword;