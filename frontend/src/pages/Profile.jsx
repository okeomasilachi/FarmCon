import React, {useEffect} from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Profiledata from '../components/profile/Profiledata'
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userInfo } from "../atoms/User";

const Profile = () => {
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
        <Profiledata />
      </div>
    </div>
  )
}

export default Profile