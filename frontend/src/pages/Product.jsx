import React from 'react'
import Sidebar from '../components/Sidebar'
import Producttable from '../components/Producttable'

const Product = () => {
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