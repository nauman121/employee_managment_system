import React from "react";
// import Registration  from './newApp/components/Form/Registration'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
// import {useParams} from 'react-router'
import "./assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";
import AddEmployee from './components/Form/AddEmployee'
import LeaveForm from './components/Form/LeaveForm'
import UpdateEmployee from './components/Form/updateEmployee'
import EditLeave from './components/Form/EditLeave'
import EditLeadLeave from './components/Form/EditLeadLeave'
import AdminLayout from "./layouts/Admin.js";
import AuthLayout from "./layouts/Auth.js";
import JobHistory from './components/Form/Job_History'
import Jobs from './views/examples/jobs'
import EditJobHistory from './components/Form/editJobHistory'
import EvaluationForm from './components/Form/EvaluationForm'
import ViewEvaluationForm from './components/Form/ViewEvaluationForm'
import UserProfile from './views/examples/UserProfile'
import Warning from './components/Form/Warning'
import ChangingPassword from "./components/Form/ChangingPassword";
import AttendenceForm from './components/Form/AttendenceForm'


function Index() {
    // id.push(useParams().id);
  return(
 <Router>
    <Switch>
      <Route exact path = '/evaluationform/:id'><EvaluationForm/></Route>
        <Route exact path = '/warning/:id'><Warning/></Route>
      <Route exact path='/leaveForm'><LeaveForm/></Route>
       <Route exact path = '/user/:id/evaluation/:evaId'><ViewEvaluationForm/></Route>
      <Route exact path='/editjobhistory/:id'><Jobs/></Route>
      <Route exact path='/editjob/:id/:jobId'><EditJobHistory/></Route>
       <Route exact path='/jobHistory/:id'><JobHistory/></Route>
      <Route exact path='/addemployee'><AddEmployee/></Route>
      <Route exact path='/addattendence'><AttendenceForm/></Route>
      <Route exact path='/empLeave/:id'><EditLeave/></Route>
      <Route exact path='/leadLeaveEdit/:id'><EditLeadLeave/></Route>
      <Route exact path = '/user/:id'><UserProfile/></Route>
      <Route exact path='/:id'><UpdateEmployee/></Route>
       <Route exact path ='/change/changepassword'><ChangingPassword/></Route>
      <Route  path="/admin" render={(props) =>( <AdminLayout {...props} />)} />
      <Route  path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Redirect from='/' to='/admin/index'/>
    </Switch>
  </Router>
)
}

export default Index;
