import React from "react";
import "./Dashboard.css";
import Sidebar from "../components/sidebar/Sidebar";
import Main from "../components/main/Main";

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <Main />
      </div>
    </div>
  );
};

export default Dashboard;
