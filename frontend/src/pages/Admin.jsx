import React from 'react'
import Sidebar from '../components/Sidebar'
import Maintable from '../components/Maintable'



const Admin = () => {
  return (
	<div className="container-fluid">
      <div className="row">
        <Sidebar />
        <Maintable />
      </div>
    </div>
  )
}

export default Admin