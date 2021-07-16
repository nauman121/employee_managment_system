import React from 'react'
import { Form,Col, Button,Row } from "react-bootstrap";
import {API,graphqlOperation} from "aws-amplify";
import {createEvaluation} from '../../../graphql/mutations'
import {getEmployee} from '../../../graphql/queries'
import {useParams} from 'react-router'
import {name} from '../../../App'
import {useHistory} from 'react-router'
const EvaluationForm=()=> {
  const [loading,setLoading]=React.useState(false);
  const [er,setEr] = React.useState('');
  const reviewer_name=name[name.length-1];
  const userId=useParams().id;
const [empName,setEmpName]=React.useState('');

const [data,setData] = React.useState({reviewer_title:'',two:'',three:'',four:'',five:'',six:'',seven:'',eight:'',nine:'',ten:'',eleven:'',twelve:'',thirteen:'',fourteen:'',fifteen:'',sixteen:'',seventeen:'',eighteen:'',nineteen:'',twenty:'',twentyone:'',twentytwo:''});

const getEmp=async ()=>{
const empData = await API.graphql(graphqlOperation(getEmployee,{id:userId}));
setEmpName(empData.data.getEmployee.employee_name);
}
React.useEffect(()=>{
getEmp();
},[])
const createEva= async()=>{
  try{
        await API.graphql(graphqlOperation(createEvaluation,{input:{employee_id:userId,reviewer_name,reviewer_title:data.reviewer_title,employee_name:empName,reviewing_date:new Date().getFullYear()+'/'+ (new Date().getMonth()+1)+'/'+new Date().getDate(),q_one:data.one,q_two:data.two,q_three:data.three,q_four:data.four,q_five:data.five,q_six:data.six,q_seven:data.seven,q_eight:data.eight,q_nine:data.nine,q_ten:data.ten,q_eleven:data.eleven,q_twelve:data.twelve,q_thirteen:data.thirteen,q_fourteen:data.fourteen,q_fifteen:data.fifteen,q_sixteen:data.sixteen,q_seventeen:data.seventeen,q_eighteen:data.eighteen,q_nineteen:data.nineteen,q_twenty:data.twenty,q_twentyone:data.twentyone,q_twentytwo:data.twentytwo}}));
   window.alert('Form submit successfully');
  }
  catch(err){
    setEr(err.message);
  }
}

const clickHandler=(e)=>{
  e.preventDefault();
  if( data.reviewer_title  && data.one && data.two && data.three && data.four && data.five && data.six && data.seven && data.eight && data.nine && data.ten && data.eleven && data.twelve && data.thirteen && data.fourteen && data.fifteen && data.sixteen && data.seventeen && data.eighteen && data.nineteen && data.twenty && data.twentyone && data.twentytwo){
  createEva();
  setLoading(true);
  setTimeout(()=>{
    setLoading(false);
 history.push('/admin/team');
  },2000)
 
  }
  else {
    setEr('please fill form completely');
  } 
}
const history=useHistory();
const cancelHandler=(e)=>{
e.preventDefault();
history.push('/admin/team');

}
    return (   <div > 
       
         <div id="role-form-outer-div" className="mx-5 p-5">
          <Form id="form" style={{border:'1px solid gray',padding:'4px'}} >
             <h1 id="role-form-title" className=" mb-4 px-1">Employee Evaluation Form</h1>
            <Form.Group as={Row}>
              <Form.Label column sm={2} >
              Reviewer Name 
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  name='employee_Id'
                  placeholder="Employee Id"
                  value={reviewer_name}
                //  onChange={(e)=>setData({...data,reviewer_name:e.target.value})}
                  required
                  disabled
                />
              </Col>
            </Form.Group>
              <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Reviewer Title
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  name='employee_Id'
                  placeholder="Title"
                 value={data.reviewer_title}
                 onChange={(e)=>setData({...data,reviewer_title:e.target.value})}
                  required
                />
              </Col>
            </Form.Group>
              <Form.Group as={Row}>
            <Form.Label column sm={2}>
             Employee Name
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  name='employee_Id'
                  placeholder="Employee Id"
                  value={empName}
                //onChange={(e)=>setData({...data,employee_name:e.target.value})}
                  required
                  disabled
                />
              </Col>
            </Form.Group>
              <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Reviewing date
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  name='employee_Id'
                  placeholder="Employee Id"
                 value={new Date().getFullYear()+'/'+ (new Date().getMonth()+1)+'/'+new Date().getDate()}
                //onChange={(e)=>setData({...data,reviewing_date:e.target.value})}
                  required
                  disabled
                />
              </Col>
            </Form.Group>
                      <h3 class = 'bg-gray text-center my-5 text-white' sm={12}>Productivity</h3>
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2} className='mt--2 text-dark'>
                Make realistic goals :
               </Form.Label>
              <Col sm={10} >
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Unsatisfactory"
                  value="Unsatisfactory"
                  name="one"
                  checked={data.one==='Unsatisfactory'}
                  onChange={()=>setData({...data,one:'Unsatisfactory'})}
                  required
                />
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Inconsistent"
                  value="Inconsistent"
                   checked={data.one==='Inconsistent'}
                  name="one"
                  onChange={()=>setData({...data,one:'Inconsistent'})}
                  required
                />
                 <Form.Check
                 className='mx-4'
                  inline
                  type="radio"
                  label="Proficient"
                  value="Proficient"
                  checked={data.one==='Proficient'}
                  name="one"
                onChange={()=>setData({...data,one:'Proficient'})}
                  required
                />
                 <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="effective"
                  value="effective"
                  checked={data.one==='effective'}
                  name="one"
                   onChange={()=>setData({...data,one:'effective'})}
                  required
                />
                <Form.Check
              className='mx-4'
                  inline
                  type="radio"
                  label="Exceptional"
                  value="Exceptional"
                  checked={data.one==='Exceptional'}
                  name="one"
                  onChange={()=>setData({...data,one:'Exceptional'})}
                  required
                />
              </Col>
            </Form.Group> 
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2} className='mt--2 text-dark'>
                Meet deadlines :
               </Form.Label>
              <Col sm={10} >
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Unsatisfactory"
                  value="Unsatisfactory"
                  name="two"
                  checked={data.two==='Unsatisfactory'}
                  onChange={()=>setData({...data,two:'Unsatisfactory'})}
                  required
                />
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Inconsistent"
                  value="Inconsistent"
                   checked={data.two==='Inconsistent'}
                  name="two"
                  onChange={()=>setData({...data,two:'Inconsistent'})}
                  required
                />
                 <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Proficient"
                  value="Proficient"
                  checked={data.two==='Proficient'}
                  name="two"
                onChange={()=>setData({...data,two:'Proficient'})}
                  required
                />
                 <Form.Check
                 className='mx-4'
                  inline
                  type="radio"
                  label="effective"
                  value="effective"
                  checked={data.two==='effective'}
                  name="two"
                   onChange={()=>setData({...data,two:'effective'})}
                  required
                />
                <Form.Check
               className='mx-4'
                  inline
                  type="radio"
                  label="Exceptional"
                  value="Exceptional"
                  checked={data.two==='Exceptional'}
                  name="two"
                  onChange={()=>setData({...data,two:'Exceptional'})}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2} className='mt--2 text-dark'>
                Knowledge of work :
               </Form.Label>
              <Col sm={10} >
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Unsatisfactory"
                  value="Unsatisfactory"
                  name="three"
                  checked={data.three==='Unsatisfactory'}
                  onChange={()=>setData({...data,three:'Unsatisfactory'})}
                  required
                />
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Inconsistent"
                  value="Inconsistent"
                   checked={data.three==='Inconsistent'}
                  name="three"
                  onChange={()=>setData({...data,three:'Inconsistent'})}
                  required
                />
                 <Form.Check
                 className='mx-4'
                  inline
                  type="radio"
                  label="Proficient"
                  value="Proficient"
                  checked={data.three==='Proficient'}
                  name="three"
                onChange={()=>setData({...data,three:'Proficient'})}
                  required
                />
                 <Form.Check
                 className='mx-4'
                  inline
                  type="radio"
                  label="effective"
                  value="effective"
                  checked={data.three==='effective'}
                  name="three"
                   onChange={()=>setData({...data,three:'effective'})}
                  required
                />
                <Form.Check
               className='mx-4'
                  inline
                  type="radio"
                  label="Exceptional"
                  value="Exceptional"
                  checked={data.three==='Exceptional'}
                  name="three"
                  onChange={()=>setData({...data,three:'Exceptional'})}
                  required
                />
              </Col>
            </Form.Group> 
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2} className='mt--2 text-dark'>
                Code quality :
               </Form.Label>
              <Col sm={10} >
                <Form.Check
                  inline
                  className='mx-4'
                  type="radio"
                  label="Unsatisfactory"
                  value="Unsatisfactory"
                  name="four"
                  checked={data.four==='Unsatisfactory'}
                  onChange={()=>setData({...data,four:'Unsatisfactory'})}
                  required
                />
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Inconsistent"
                  value="Inconsistent"
                   checked={data.four==='Inconsistent'}
                  name="four"
                  onChange={()=>setData({...data,four:'Inconsistent'})}
                  required
                />
                 <Form.Check
                 className='mx-4'
                  inline
                  type="radio"
                  label="Proficient"
                  value="Proficient"
                  checked={data.four==='Proficient'}
                  name="four"
                onChange={()=>setData({...data,four:'Proficient'})}
                  required
                />
                 <Form.Check
                 className='mx-4'
                  inline
                  type="radio"
                  label="effective"
                  value="effective"
                  checked={data.four==='effective'}
                  name="four"
                   onChange={()=>setData({...data,four:'effective'})}
                  required
                />
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Exceptional"
                  value="Exceptional"
                  checked={data.four==='Exceptional'}
                  name="four"
                  onChange={()=>setData({...data,four:'Exceptional'})}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2} className='mt--2 text-dark'>
                Code reviews :
               </Form.Label>
              <Col sm={10} >
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Unsatisfactory"
                  value="Unsatisfactory"
                  name="five"
                  checked={data.five==='Unsatisfactory'}
                  onChange={()=>setData({...data,five:'Unsatisfactory'})}
                  required
                />
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Inconsistent"
                  value="Inconsistent"
                   checked={data.five==='Inconsistent'}
                  name="five"
                  onChange={()=>setData({...data,five:'Inconsistent'})}
                  required
                />
                 <Form.Check
                 className='mx-4'
                  inline
                  type="radio"
                  label="Proficient"
                  value="Proficient"
                  checked={data.five==='Proficient'}
                  name="five"
                onChange={()=>setData({...data,five:'Proficient'})}
                  required
                />
                 <Form.Check
                 className='mx-4'
                  inline
                  type="radio"
                  label="effective"
                  value="effective"
                  checked={data.five==='effective'}
                  name="five"
                   onChange={()=>setData({...data,five:'effective'})}
                  required
                />
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Exceptional"
                  value="Exceptional"
                  checked={data.five==='Exceptional'}
                  name="five"
                  onChange={()=>setData({...data,five:'Exceptional'})}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
            <Form.Label as="legend" column sm={2} className='mt--2 text-dark'>
                Find realistic solutions :
               </Form.Label>
              <Col sm={10} >
                <Form.Check
               className='mx-4'
                  inline
                  type="radio"
                  label="Unsatisfactory"
                  value="Unsatisfactory"
                  name="six"
                  checked={data.six==='Unsatisfactory'}
                  onChange={()=>setData({...data,six:'Unsatisfactory'})}
                  required
                />
                <Form.Check
               className='mx-4'
                  inline
                  type="radio"
                  label="Inconsistent"
                  value="Inconsistent"
                   checked={data.six==='Inconsistent'}
                  name="six"
                  onChange={()=>setData({...data,six:'Inconsistent'})}
                  required
                />
                 <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Proficient"
                  value="Proficient"
                  checked={data.six==='Proficient'}
                  name="six"
                onChange={()=>setData({...data,six:'Proficient'})}
                  required
                />
                 <Form.Check
                 className='mx-4'
                  inline
                  type="radio"
                  label="effective"
                  value="effective"
                  checked={data.six==='effective'}
                  name="six"
                   onChange={()=>setData({...data,six:'effective'})}
                  required
                />
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Exceptional"
                  value="Exceptional"
                  checked={data.six==='Exceptional'}
                  name="six"
                  onChange={()=>setData({...data,six:'Exceptional'})}
                  required
                />
              </Col>
            </Form.Group>
            <h3 class = 'bg-gray text-center my-5 text-white' sm={12}>Communication</h3>
                        <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2} className='mt--2 text-dark'>
                Verbal communication :
               </Form.Label>
              <Col sm={10} >
                <Form.Check
                  inline
                  className='mx-4'
                  type="radio"
                  label="Unsatisfactory"
                  value="Unsatisfactory"
                  name="seven"
                  checked={data.seven==='Unsatisfactory'}
                  onChange={()=>setData({...data,seven:'Unsatisfactory'})}
                  required
                />
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Inconsistent"
                  value="Inconsistent"
                   checked={data.seven==='Inconsistent'}
                  name="seven"
                  onChange={()=>setData({...data,seven:'Inconsistent'})}
                  required
                />
                 <Form.Check
                 className='mx-4'
                  inline
                  type="radio"
                  label="Proficient"
                  value="Proficient"
                  checked={data.seven==='Proficient'}
                  name="seven"
                onChange={()=>setData({...data,seven:'Proficient'})}
                  required
                />
                 <Form.Check
                 className='mx-4'
                  inline
                  type="radio"
                  label="effective"
                  value="effective"
                  checked={data.seven==='effective'}
                  name="seven"
                   onChange={()=>setData({...data,seven:'effective'})}
                  required
                />
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Exceptional"
                  value="Exceptional"
                  checked={data.seven==='Exceptional'}
                  name="seven"
                  onChange={()=>setData({...data,seven:'Exceptional'})}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2} className='mt--2 text-dark'>
                Written communication (reports/documentation):
               </Form.Label>
              <Col sm={10} >
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Unsatisfactory"
                  value="Unsatisfactory"
                  name="eight"
                  checked={data.eight==='Unsatisfactory'}
                  onChange={()=>setData({...data,eight:'Unsatisfactory'})}
                  required
                />
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Inconsistent"
                  value="Inconsistent"
                   checked={data.eight==='Inconsistent'}
                  name="eight"
                  onChange={()=>setData({...data,eight:'Inconsistent'})}
                  required
                />
                 <Form.Check
                 className='mx-4'
                  inline
                  type="radio"
                  label="Proficient"
                  value="Proficient"
                  checked={data.eight==='Proficient'}
                  name="eight"
                onChange={()=>setData({...data,eight:'Proficient'})}
                  required
                />
                 <Form.Check
                 className='mx-4'
                  inline
                  type="radio"
                  label="effective"
                  value="effective"
                  checked={data.eight==='effective'}
                  name="eight"
                   onChange={()=>setData({...data,eight:'effective'})}
                  required
                />
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Exceptional"
                  value="Exceptional"
                  checked={data.eight==='Exceptional'}
                  name="eight"
                  onChange={()=>setData({...data,eight:'Exceptional'})}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
            <Form.Label as="legend" column sm={2} className='mt--2 text-dark'>
                Processes received information :
               </Form.Label>
              <Col sm={10} >
                <Form.Check
               className='mx-4'
                  inline
                  type="radio"
                  label="Unsatisfactory"
                  value="Unsatisfactory"
                  name="nine"
                  checked={data.nine==='Unsatisfactory'}
                  onChange={()=>setData({...data,nine:'Unsatisfactory'})}
                  required
                />
                <Form.Check
               className='mx-4'
                  inline
                  type="radio"
                  label="Inconsistent"
                  value="Inconsistent"
                   checked={data.nine==='Inconsistent'}
                  name="nine"
                  onChange={()=>setData({...data,nine:'Inconsistent'})}
                  required
                />
                 <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Proficient"
                  value="Proficient"
                  checked={data.nine==='Proficient'}
                  name="nine"
                onChange={()=>setData({...data,nine:'Proficient'})}
                  required
                />
                 <Form.Check
                 className='mx-4'
                  inline
                  type="radio"
                  label="effective"
                  value="effective"
                  checked={data.nine==='effective'}
                  name="nine"
                   onChange={()=>setData({...data,nine:'effective'})}
                  required
                />
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Exceptional"
                  value="Exceptional"
                  checked={data.nine==='Exceptional'}
                  name="nine"
                  onChange={()=>setData({...data,nine:'Exceptional'})}
                  required
                />
              </Col>
            </Form.Group>
        <h3 class = 'bg-gray text-center my-5 text-white' sm={12}>Various</h3>
                           <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2} className='mt--2 text-dark'>
                Ability to work independently :
               </Form.Label>
              <Col sm={10} >
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Unsatisfactory"
                  value="Unsatisfactory"
                  name="ten"
                  checked={data.ten==='Unsatisfactory'}
                  onChange={()=>setData({...data,ten:'Unsatisfactory'})}
                  required
                />
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Inconsistent"
                  value="Inconsistent"
                   checked={data.ten==='Inconsistent'}
                  name="ten"
                  onChange={()=>setData({...data,ten:'Inconsistent'})}
                  required
                />
                 <Form.Check
                 className='mx-4'
                  inline
                  type="radio"
                  label="Proficient"
                  value="Proficient"
                  checked={data.ten==='Proficient'}
                  name="ten"
                onChange={()=>setData({...data,ten:'Proficient'})}
                  required
                />
                 <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="effective"
                  value="effective"
                  checked={data.ten==='effective'}
                  name="ten"
                   onChange={()=>setData({...data,ten:'effective'})}
                  required
                />
                <Form.Check
              className='mx-4'
                  inline
                  type="radio"
                  label="Exceptional"
                  value="Exceptional"
                  checked={data.ten==='Exceptional'}
                  name="ten"
                  onChange={()=>setData({...data,ten:'Exceptional'})}
                  required
                />
              </Col>
            </Form.Group> 
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2} className='mt--2 text-dark'>
                Willingness to take on additional responsibilities :
               </Form.Label>
              <Col sm={10} >
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Unsatisfactory"
                  value="Unsatisfactory"
                  name="eleven"
                  checked={data.eleven==='Unsatisfactory'}
                  onChange={()=>setData({...data,eleven:'Unsatisfactory'})}
                  required
                />
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Inconsistent"
                  value="Inconsistent"
                   checked={data.eleven==='Inconsistent'}
                  name="eleven"
                  onChange={()=>setData({...data,eleven:'Inconsistent'})}
                  required
                />
                 <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Proficient"
                  value="Proficient"
                  checked={data.eleven==='Proficient'}
                  name="eleven"
                onChange={()=>setData({...data,eleven:'Proficient'})}
                  required
                />
                 <Form.Check
                 className='mx-4'
                  inline
                  type="radio"
                  label="effective"
                  value="effective"
                  checked={data.eleven==='effective'}
                  name="eleven"
                   onChange={()=>setData({...data,eleven:'effective'})}
                  required
                />
                <Form.Check
               className='mx-4'
                  inline
                  type="radio"
                  label="Exceptional"
                  value="Exceptional"
                  checked={data.eleven==='Exceptional'}
                  name="eleven"
                  onChange={()=>setData({...data,eleven:'Exceptional'})}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2} className='mt--2 text-dark'>
                Reliability (punctuality, attendance) :
               </Form.Label>
              <Col sm={10} >
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Unsatisfactory"
                  value="Unsatisfactory"
                  name="twelve"
                  checked={data.twelve==='Unsatisfactory'}
                  onChange={()=>setData({...data,twelve:'Unsatisfactory'})}
                  required
                />
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Inconsistent"
                  value="Inconsistent"
                   checked={data.twelve==='Inconsistent'}
                  name="twelve"
                  onChange={()=>setData({...data,twelve:'Inconsistent'})}
                  required
                />
                 <Form.Check
                 className='mx-4'
                  inline
                  type="radio"
                  label="Proficient"
                  value="Proficient"
                  checked={data.twelve==='Proficient'}
                  name="twelve"
                onChange={()=>setData({...data,twelve:'Proficient'})}
                  required
                />
                 <Form.Check
                 className='mx-4'
                  inline
                  type="radio"
                  label="effective"
                  value="effective"
                  checked={data.twelve==='effective'}
                  name="twelve"
                   onChange={()=>setData({...data,twelve:'effective'})}
                  required
                />
                <Form.Check
               className='mx-4'
                  inline
                  type="radio"
                  label="Exceptional"
                  value="Exceptional"
                  checked={data.twelve==='Exceptional'}
                  name="twelve"
                  onChange={()=>setData({...data,twelve:'Exceptional'})}
                  required
                />
              </Col>
            </Form.Group> 
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2} className='mt--2 text-dark'>
                Change orientation :
               </Form.Label>
              <Col sm={10} >
                <Form.Check
                  inline
                  className='mx-4'
                  type="radio"
                  label="Unsatisfactory"
                  value="Unsatisfactory"
                  name="thirteen"
                  checked={data.thirteen==='Unsatisfactory'}
                  onChange={()=>setData({...data,thirteen:'Unsatisfactory'})}
                  required
                />
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Inconsistent"
                  value="Inconsistent"
                   checked={data.thirteen==='Inconsistent'}
                  name="thirteen"
                  onChange={()=>setData({...data,thirteen:'Inconsistent'})}
                  required
                />
                 <Form.Check
                 className='mx-4'
                  inline
                  type="radio"
                  label="Proficient"
                  value="Proficient"
                  checked={data.thirteen==='Proficient'}
                  name="thirteen"
                onChange={()=>setData({...data,thirteen:'Proficient'})}
                  required
                />
                 <Form.Check
                 className='mx-4'
                  inline
                  type="radio"
                  label="effective"
                  value="effective"
                  checked={data.thirteen==='effective'}
                  name="thirteen"
                   onChange={()=>setData({...data,thirteen:'effective'})}
                  required
                />
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Exceptional"
                  value="Exceptional"
                  checked={data.thirteen==='Exceptional'}
                  name="thirteen"
                  onChange={()=>setData({...data,thirteen:'Exceptional'})}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2} className='mt--2 text-dark'>
                Employee engagement :
               </Form.Label>
              <Col sm={10} >
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Unsatisfactory"
                  value="Unsatisfactory"
                  name="fourteen"
                  checked={data.fourteen==='Unsatisfactory'}
                  onChange={()=>setData({...data,fourteen:'Unsatisfactory'})}
                  required
                />
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Inconsistent"
                  value="Inconsistent"
                   checked={data.fourteen==='Inconsistent'}
                  name="fourteen"
                  onChange={()=>setData({...data,fourteen:'Inconsistent'})}
                  required
                />
                 <Form.Check
                 className='mx-4'
                  inline
                  type="radio"
                  label="Proficient"
                  value="Proficient"
                  checked={data.fourteen==='Proficient'}
                  name="fourteen"
                onChange={()=>setData({...data,fourteen:'Proficient'})}
                  required
                />
                 <Form.Check
                 className='mx-4'
                  inline
                  type="radio"
                  label="effective"
                  value="effective"
                  checked={data.fourteen==='effective'}
                  name="fourteen"
                   onChange={()=>setData({...data,fourteen:'effective'})}
                  required
                />
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Exceptional"
                  value="Exceptional"
                  checked={data.fourteen==='Exceptional'}
                  name="fourteen"
                  onChange={()=>setData({...data,fourteen:'Exceptional'})}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
            <Form.Label as="legend" column sm={2} className='mt--2 text-dark'>
                Decision Making power :
               </Form.Label>
              <Col sm={10} >
                <Form.Check
               className='mx-4'
                  inline
                  type="radio"
                  label="Unsatisfactory"
                  value="Unsatisfactory"
                  name="fifteen"
                  checked={data.fifteen==='Unsatisfactory'}
                  onChange={()=>setData({...data,fifteen:'Unsatisfactory'})}
                  required
                />
                <Form.Check
               className='mx-4'
                  inline
                  type="radio"
                  label="Inconsistent"
                  value="Inconsistent"
                   checked={data.fifteen==='Inconsistent'}
                  name="fifteen"
                  onChange={()=>setData({...data,fifteen:'Inconsistent'})}
                  required
                />
                 <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Proficient"
                  value="Proficient"
                  checked={data.fifteen==='Proficient'}
                  name="fifteen"
                onChange={()=>setData({...data,fifteen:'Proficient'})}
                  required
                />
                 <Form.Check
                 className='mx-4'
                  inline
                  type="radio"
                  label="effective"
                  value="effective"
                  checked={data.fifteen==='effective'}
                  name="fifteen"
                   onChange={()=>setData({...data,fifteen:'effective'})}
                  required
                />
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Exceptional"
                  value="Exceptional"
                  checked={data.fifteen==='Exceptional'}
                  name="fifteen"
                  onChange={()=>setData({...data,fifteen:'Exceptional'})}
                  required
                />
              </Col>
            </Form.Group>
                        <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2} className='mt--2 text-dark'>
                Planning and organizing :
               </Form.Label>
              <Col sm={10} >
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Unsatisfactory"
                  value="Unsatisfactory"
                  name="sixteen"
                  checked={data.sixteen==='Unsatisfactory'}
                  onChange={()=>setData({...data,sixteen:'Unsatisfactory'})}
                  required
                />
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Inconsistent"
                  value="Inconsistent"
                   checked={data.sixteen==='Inconsistent'}
                  name="sixteen"
                  onChange={()=>setData({...data,sixteen:'Inconsistent'})}
                  required
                />
                 <Form.Check
                 className='mx-4'
                  inline
                  type="radio"
                  label="Proficient"
                  value="Proficient"
                  checked={data.sixteen==='Proficient'}
                  name="sixteen"
                onChange={()=>setData({...data,sixteen:'Proficient'})}
                  required
                />
                 <Form.Check
                 className='mx-4'
                  inline
                  type="radio"
                  label="effective"
                  value="effective"
                  checked={data.sixteen==='effective'}
                  name="sixteen"
                   onChange={()=>setData({...data,sixteen:'effective'})}
                  required
                />
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Exceptional"
                  value="Exceptional"
                  checked={data.sixteen==='Exceptional'}
                  name="sixteen"
                  onChange={()=>setData({...data,sixteen:'Exceptional'})}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
            <Form.Label as="legend" column sm={2} className='mt--2 text-dark'>
               Integrity and ethical management :
               </Form.Label>
              <Col sm={10} >
                <Form.Check
               className='mx-4'
                  inline
                  type="radio"
                  label="Unsatisfactory"
                  value="Unsatisfactory"
                  name="seventeen"
                  checked={data.seventeen==='Unsatisfactory'}
                  onChange={()=>setData({...data,seventeen:'Unsatisfactory'})}
                  required
                />
                <Form.Check
               className='mx-4'
                  inline
                  type="radio"
                  label="Inconsistent"
                  value="Inconsistent"
                   checked={data.seventeen==='Inconsistent'}
                  name="seventeen"
                  onChange={()=>setData({...data,seventeen:'Inconsistent'})}
                  required
                />
                 <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Proficient"
                  value="Proficient"
                  checked={data.seventeen==='Proficient'}
                  name="seveteen"
                onChange={()=>setData({...data,seventeen:'Proficient'})}
                  required
                />
                 <Form.Check
                 className='mx-4'
                  inline
                  type="radio"
                  label="effective"
                  value="effective"
                  checked={data.seventeen==='effective'}
                  name="seventeen"
                   onChange={()=>setData({...data,seventeen:'effective'})}
                  required
                />
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Exceptional"
                  value="Exceptional"
                  checked={data.seventeen==='Exceptional'}
                  name="seventeen"
                  onChange={()=>setData({...data,seventeen:'Exceptional'})}
                  required
                />
              </Col>
            </Form.Group>
             <h3 class = 'bg-gray text-center my-5 text-white' sm={12}>Personal Development</h3>
              <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2} className='mt--2 text-dark'>
                Set challenging goals :
               </Form.Label>
              <Col sm={10} >
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Unsatisfactory"
                  value="Unsatisfactory"
                  name="eighteen"
                  checked={data.eighteen==='Unsatisfactory'}
                  onChange={()=>setData({...data,eighteen:'Unsatisfactory'})}
                  required
                />
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Inconsistent"
                  value="Inconsistent"
                   checked={data.eighteen==='Inconsistent'}
                  name="eighteen"
                  onChange={()=>setData({...data,eighteen:'Inconsistent'})}
                  required
                />
                 <Form.Check
                 className='mx-4'
                  inline
                  type="radio"
                  label="Proficient"
                  value="Proficient"
                  checked={data.eighteen==='Proficient'}
                  name="eighteen"
                onChange={()=>setData({...data,eighteen:'Proficient'})}
                  required
                />
                 <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="effective"
                  value="effective"
                  checked={data.eighteen==='effective'}
                  name="eighteen"
                   onChange={()=>setData({...data,eighteen:'effective'})}
                  required
                />
                <Form.Check
              className='mx-4'
                  inline
                  type="radio"
                  label="Exceptional"
                  value="Exceptional"
                  checked={data.eighteen==='Exceptional'}
                  name="eighteen"
                  onChange={()=>setData({...data,eighteen:'Exceptional'})}
                  required
                />
              </Col>
            </Form.Group> 
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2} className='mt--2 text-dark'>
                Actively seeks and promotes innovative ways of working :
               </Form.Label>
              <Col sm={10} >
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Unsatisfactory"
                  value="Unsatisfactory"
                  name="nineteen"
                  checked={data.nineteen==='Unsatisfactory'}
                  onChange={()=>setData({...data,nineteen:'Unsatisfactory'})}
                  required
                />
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Inconsistent"
                  value="Inconsistent"
                   checked={data.nineteen==='Inconsistent'}
                  name="nineteen"
                  onChange={()=>setData({...data,nineteen:'Inconsistent'})}
                  required
                />
                 <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Proficient"
                  value="Proficient"
                  checked={data.nineteen==='Proficient'}
                  name="nineteen"
                onChange={()=>setData({...data,nineteen:'Proficient'})}
                  required
                />
                 <Form.Check
                 className='mx-4'
                  inline
                  type="radio"
                  label="effective"
                  value="effective"
                  checked={data.nineteen==='effective'}
                  name="nineteen"
                   onChange={()=>setData({...data,nineteen:'effective'})}
                  required
                />
                <Form.Check
               className='mx-4'
                  inline
                  type="radio"
                  label="Exceptional"
                  value="Exceptional"
                  checked={data.nineteen==='Exceptional'}
                  name="nineteen"
                  onChange={()=>setData({...data,nineteen:'Exceptional'})}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2} className='mt--2 text-dark'>
                Self-development :
               </Form.Label>
              <Col sm={10} >
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Unsatisfactory"
                  value="Unsatisfactory"
                  name="twenty"
                  checked={data.twenty==='Unsatisfactory'}
                  onChange={()=>setData({...data,twenty:'Unsatisfactory'})}
                  required
                />
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Inconsistent"
                  value="Inconsistent"
                   checked={data.twenty==='Inconsistent'}
                  name="twenty"
                  onChange={()=>setData({...data,twenty:'Inconsistent'})}
                  required
                />
                 <Form.Check
                 className='mx-4'
                  inline
                  type="radio"
                  label="Proficient"
                  value="Proficient"
                  checked={data.twenty==='Proficient'}
                  name="twenty"
                onChange={()=>setData({...data,twenty:'Proficient'})}
                  required
                />
                 <Form.Check
                 className='mx-4'
                  inline
                  type="radio"
                  label="effective"
                  value="effective"
                  checked={data.twenty==='effective'}
                  name="twenty"
                   onChange={()=>setData({...data,twenty:'effective'})}
                  required
                />
                <Form.Check
               className='mx-4'
                  inline
                  type="radio"
                  label="Exceptional"
                  value="Exceptional"
                  checked={data.twenty==='Exceptional'}
                  name="twenty"
                  onChange={()=>setData({...data,twenty:'Exceptional'})}
                  required
                />
              </Col>
            </Form.Group> 
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2} className='mt--2 text-dark'>
                Level of formality :
               </Form.Label>
              <Col sm={10} >
                <Form.Check
                  inline
                  className='mx-4'
                  type="radio"
                  label="Unsatisfactory"
                  value="Unsatisfactory"
                  name="twentyone"
                  checked={data.twentyone==='Unsatisfactory'}
                  onChange={()=>setData({...data,twentyone:'Unsatisfactory'})}
                  required
                />
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Inconsistent"
                  value="Inconsistent"
                   checked={data.twentyone==='Inconsistent'}
                  name="twentyone"
                  onChange={()=>setData({...data,twentyone:'Inconsistent'})}
                  required
                />
                 <Form.Check
                 className='mx-4'
                  inline
                  type="radio"
                  label="Proficient"
                  value="Proficient"
                  checked={data.twentyone==='Proficient'}
                  name="twentyone"
                onChange={()=>setData({...data,twentyone:'Proficient'})}
                  required
                />
                 <Form.Check
                 className='mx-4'
                  inline
                  type="radio"
                  label="effective"
                  value="effective"
                  checked={data.twentyone==='effective'}
                  name="twentyone"
                   onChange={()=>setData({...data,twentyone:'effective'})}
                  required
                />
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Exceptional"
                  value="Exceptional"
                  checked={data.twentyone==='Exceptional'}
                  name="twentyone"
                  onChange={()=>setData({...data,twentyone:'Exceptional'})}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2} className='mt--2 text-dark'>
                Focus on cooperation, teamwork, or competitiveness :
               </Form.Label>
              <Col sm={10} >
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Unsatisfactory"
                  value="Unsatisfactory"
                  name="twentytwo"
                  checked={data.twentytwo==='Unsatisfactory'}
                  onChange={()=>setData({...data,twentytwo:'Unsatisfactory'})}
                  required
                />
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Inconsistent"
                  value="Inconsistent"
                   checked={data.twentytwo==='Inconsistent'}
                  name="twentytwo"
                  onChange={()=>setData({...data,twentytwo:'Inconsistent'})}
                  required
                />
                 <Form.Check
                 className='mx-4'
                  inline
                  type="radio"
                  label="Proficient"
                  value="Proficient"
                  checked={data.twentytwo==='Proficient'}
                  name="twentytwo"
                onChange={()=>setData({...data,twentytwo:'Proficient'})}
                  required
                />
                 <Form.Check
                 className='mx-4'
                  inline
                  type="radio"
                  label="effective"
                  value="effective"
                  checked={data.twentytwo==='effective'}
                  name="twentytwo"
                   onChange={()=>setData({...data,twentytwo:'effective'})}
                  required
                />
                <Form.Check
                className='mx-4'
                  inline
                  type="radio"
                  label="Exceptional"
                  value="Exceptional"
                  checked={data.twentytwo==='Exceptional'}
                  name="twentytwo"
                  onChange={()=>setData({...data,twentytwo:'Exceptional'})}
                  required
                />
              </Col>
            </Form.Group>
              
              <div className='px-5'  style={{display:'flex',flexDirection:'row',gap:'3vw',marginLeft:'13vw'}}>
            <Form.Group as={Row} id="form-submit-button" >
              <Col sm={{ span: 10, offset:2}}>
                <Button disabled={loading?'true':''} onClick={clickHandler}>Submit</Button>
              </Col>
            </Form.Group>
            <Form.Group as={Row} id="form-submit-button" >
              <Col sm={{ span: 10, offset:2}} >
                 <Button className='bg-light' disabled={loading?'true':''} onClick={cancelHandler}>Cancel</Button>
              </Col>
            </Form.Group>
            <p className="alert">{er}</p>
            </div>
            </Form>
          </div>
           
      </div>
         )
}

export default EvaluationForm;
