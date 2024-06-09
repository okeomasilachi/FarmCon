import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Profiledata from '../components/profile/Profiledata'


const Profile = () => {
 
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