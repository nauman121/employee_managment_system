import React from "react";
import { Link } from "react-router-dom";
// import img1 from '../../../img/1.JPG
import {getEmployee} from '../../../graphql/queries'
import {API,graphqlOperation,Auth,Storage} from 'aws-amplify'
import {useHistory} from 'react-router'
import {id} from '../../../App'

import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";


const AdminNavbar = (props) => {
const history=useHistory();
React.useEffect(()=>{
getEmp();
},[])
const [data,setData]=React.useState({pic:''});
const getEmp=async()=>{
const data=await API.graphql(graphqlOperation(getEmployee,{id:id[id.length-1]}))
// console.log(data.data.getEmployee.employee_name);
 setData({pic:data.data.getEmployee.employee_pic});
}


  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
           
          </Form>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img src={`https://ems3425b0d312534fc887d7f1545129bee9134248-dev.s3.ap-southeast-1.amazonaws.com/public/${data.pic}`}  style={{height:'100%'}} alt="..." />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                     {/* <span className="mb-0 text-sm font-weight-bold">
                    {data.name} 
                    </span>  */}
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem to="/change/changepassword" tag={Link}>
                  <i className="ni ni-lock-circle-open" />
                  <span>Change Password</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={()=> {
                  Auth.signOut();
                  history.push('/admin/index');
                    window.location.reload();
                }}>
                 <i className="ni ni-user-run" />
                 Sign Out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
