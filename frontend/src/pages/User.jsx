import React, {useEffect} from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Userstable from '../components/user/Userstable'
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userInfo } from "../atoms/User";

const User = () => {
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
        <Userstable />
      </div>
    </div>
  )
}

export default User