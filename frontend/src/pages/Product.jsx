import React, {useEffect} from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Producttable from '../components/product/Producttable'
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userInfo } from "../atoms/User";

const Product = () => {
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
        <Producttable />
      </div>
    </div>
  )
}

export default Product