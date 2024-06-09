import React, { useEffect } from "react";
import "./Dashboard.css";
import Sidebar from "../components/sidebar/Sidebar";
import Main from "../components/main/Main";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userInfo } from "../atoms/User";

const Dashboard = () => {
  let user = useRecoilValue(userInfo);
  let redir = useNavigate();

 

  useEffect(()=> {
    if (!user.isLoggedIn) {
      redir("../");
    }
  }, [user.isLoggedIn, redir])

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
