import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Producttable from '../components/product/Producttable'

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