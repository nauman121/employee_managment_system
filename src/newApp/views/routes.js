import Profile from "./examples/Profile.js";
import Tables from "./examples/Tables.js";
import LeaveTables from './examples/LeaveTable'
import LeaveOfEmployee from './examples/LeaveOfEmployee'
import LeadEmp from './examples/LeadEmp'
import OwnerTeam from './examples/OwnerTeam'
import HrEmp from './examples/HrEmp'
import AttendenceTable from './examples/AttendenceTable'
import HrAttendenceTable from './examples/HrAttandenceTable'

  export var owner= [
  {
    path: "/index",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  }
  ,
   {
    path: "/team",
    name: "Teams",
    icon: "fa fa-users text-yellow",
    component: OwnerTeam,
    layout: "/admin",
  }
];
 export var hr = [
  {
    path: "/index",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/team",
    name: "Employees",
    icon: "fa fa-users text-yellow",
    component: HrEmp,
    layout: "/admin",
  },
  {
    path: "/leaves",
    name: "Leaves",
    icon: "fa fa-envelope-open text-yellow",
    component: LeaveTables,
    layout: "/admin",
  },
  {
    path: "/attendence",
    name: "Employees Attendence",
    icon: "fa fa-address-book text-yellow",
    component: HrAttendenceTable,
    layout: "/admin",
  }
];
export var manager = [
  {
    path: "/index",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/team",
    name: "Employees",
    icon: "fa fa-users text-yellow",
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/leaves",
    name: "Leaves",
    icon: "fa fa-envelope-open text-yellow",
    component: LeaveTables,
    layout: "/admin",
  },
  {
    path: "/attendence",
    name: "Employees Attendence",
    icon: "fa fa-address-book text-yellow",
    component: HrAttendenceTable,
    layout: "/admin",
  }
];
export var emp = [
  {
    path: "/index",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/Empleaves",
    name: "My Leaves",
    icon: "fa fa-envelope-open text-yellow",
    component: LeaveOfEmployee,
    layout: "/admin",
  },
  {
    path: "/attendence",
    name: "My Attendence",
    icon: "fa fa-address-book text-yellow",
    component: AttendenceTable,
    layout: "/admin",
  }
];
export var lead = [
  {
    path: "/index",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/Empleaves",
    name: "My Leaves",
    icon: "fa fa-envelope-open text-yellow",
    component: LeaveOfEmployee,
    layout: "/admin",
  },
   {
    path: "/LeadEmpTable",
    name: "Employee Leaves",
    icon: "ni ni-bullet-list-67 text-yellow",
    component: LeaveTables,
    layout: "/admin",
  }
  ,
   {
    path: "/team",
    name: "Team",
    icon: "fa fa-users text-yellow",
    component: LeadEmp,
    layout: "/admin",
  },
  {
    path: "/attendence",
    name: "My Attendence",
    icon: "fa fa-address-book text-yellow",
    component: AttendenceTable,
    layout: "/admin",
  }
];


var routes = [
  // {
  //   path: "/index",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: Profile,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Employees",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Tables,
  //   layout: "/admin",
  // },
  // {
  //   path: "/leaves",
  //   name: "Leaves",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: LeaveTables,
  //   layout: "/admin",
  // }
];


export default routes;