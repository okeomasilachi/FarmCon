import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Admintable from '../components/admin/Admintable'



const Admin = () => {
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