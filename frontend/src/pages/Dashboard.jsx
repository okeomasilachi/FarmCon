import React from "react";
import "./Dashboard.css";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";

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
