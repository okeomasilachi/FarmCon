import React from "react";
import "./Dashboard.css";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
      </div>
    </div>
  );
};

export default Dashboard;
