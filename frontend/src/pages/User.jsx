import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Userstable from '../components/user/Userstable'
import { userInfo } from '../atoms/User'

const User = () => {
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