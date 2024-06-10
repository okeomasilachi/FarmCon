import React, {useEffect} from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Admintable from '../components/admin/Admintable'
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userInfo } from "../atoms/User";


const Admin = () => {
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
        <Admintable />
      </div>
    </div>
  )
}

export default Admin