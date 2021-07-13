import Profile from "./examples/Profile.js";
import Tables from "./examples/Tables.js";
import LeaveTables from './examples/LeaveTable'
import LeadLeaveTable from './examples/LeadLeaveTable'
import LeaveOfEmployee from './examples/LeaveOfEmployee'
import LeadEmp from './examples/LeadEmp'
import OwnerTeam from './examples/OwnerTeam'
import HrEmp from './examples/HrEmp'
import HrLeaveTable from './examples/HrLeaveTable'
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
    icon: "ni ni-bullet-list-67 text-red",
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
    icon: "ni ni-bullet-list-67 text-red",
    component: HrEmp,
    layout: "/admin",
  },
  {
    path: "/leaves",
    name: "Leaves",
    icon: "ni ni-bullet-list-67 text-red",
    component: HrLeaveTable,
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
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/leaves",
    name: "Leaves",
    icon: "ni ni-bullet-list-67 text-red",
    component: LeaveTables,
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
    name: "Employee Leaves",
    icon: "ni ni-bullet-list-67 text-red",
    component: LeaveOfEmployee,
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
    icon: "ni ni-folder-17 text-red",
    component: LeaveOfEmployee,
    layout: "/admin",
  },
   {
    path: "/LeadEmpTable",
    name: "Employee Leaves",
    icon: "ni ni-bullet-list-67 text-red",
    component: LeadLeaveTable,
    layout: "/admin",
  }
  ,
   {
    path: "/team",
    name: "Team",
    icon: "ni ni-bullet-list-67 text-red",
    component: LeadEmp,
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