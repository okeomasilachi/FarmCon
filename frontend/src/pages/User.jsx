import React from 'react'
import Sidebar from '../components/Sidebar'
import Userstable from '../components/Userstable'


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