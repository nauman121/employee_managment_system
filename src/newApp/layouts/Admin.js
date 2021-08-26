import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import AdminNavbar from "../components/Navbars/AdminNavbar.js"
import Sidebar from "../components/Sidebar/Sidebar.js"
import {roleArr} from '../../App'
import {
  hr,
  emp,
  lead,
  owner,
  manager
} from "../views/routes.js";

const Admin = (props) => {

const role=roleArr[roleArr.length-1];
  const mainContent = React.useRef(null);
  const location = useLocation();
  // roleArr.push('hr')
  console.log(role);
  
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

if(role==="employee"){
  const getRoutes = (emp) => {
    return emp.map((prop, key) => {
      if (prop.layout === "/admin" ) {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
        }
       else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < emp.length; i++) {
      if (
        props.location.pathname.indexOf(emp[i].layout + emp[i].path) !==
        -1
      ) {
        return emp[i].name;
      }
    }
    return "Brand";
  };
  return (
    <>
      <Sidebar
        {...props}
        routes={emp}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../../img/logo.png").default,
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />
        <Switch>
          {getRoutes(emp)}
          <Redirect from="*" to="/admin/index" />
        </Switch>
      </div>
    </>
  );
}
if(role==="lead"){
  const getRoutes = (lead) => {
    return lead.map((prop, key) => {
      if (prop.layout === "/admin" ) {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
        }
       else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < lead.length; i++) {
      if (
        props.location.pathname.indexOf(lead[i].layout + lead[i].path) !==
        -1
      ) {
        return lead[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={lead}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../../img/logo.png").default,
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />
        <Switch>
          {getRoutes(lead)}
          <Redirect from="*" to="/admin/index" />
        </Switch>
      </div>
    </>
  );
};

if(role==="hr"){
  const getRoutes = (hr) => {
    return hr.map((prop, key) => {
      if (prop.layout === "/admin" ) {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
        }
       else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < hr.length; i++) {
      if (
        props.location.pathname.indexOf(hr[i].layout + hr[i].path) !==
        -1
      ) {
        return hr[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={hr}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../../img/logo.png").default,
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />
        <Switch>
          {getRoutes(hr)}
          <Redirect from="*" to="/admin/index" />
        </Switch>
      </div>
    </>
  );
      }
if(role==="hr manager"){
  const getRoutes = (manager) => {
    return manager.map((prop, key) => {
      if (prop.layout === "/admin" ) {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
        }
       else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < manager.length; i++) {
      if (
        props.location.pathname.indexOf(manager[i].layout + manager[i].path) !==
        -1
      ) {
        return manager[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={manager}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../../img/logo.png").default,
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />
        <Switch>
          {getRoutes(manager)}
          <Redirect from="*" to="/admin/index" />
        </Switch>
      </div>
    </>
  );
      }

      if(role==="owner"){
  const getRoutes = (owner) => {
    return owner.map((prop, key) => {
      if (prop.layout === "/admin" ) {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
        }
       else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < owner.length; i++) {
      if (
        props.location.pathname.indexOf(owner[i].layout + owner[i].path) !==
        -1
      ) {
        return owner[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={owner}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../../img/logo.png").default,
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />
        <Switch>
          {getRoutes(owner)}
          <Redirect from="*" to="/admin/index" />
        </Switch>
      </div>
    </>
  );
      }
};

export default Admin;
