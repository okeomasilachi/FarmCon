import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
	<div className='text-center mt-5 pt-5'>
		<h3 className='mb-3'>Oops! Error 404 Page not found..</h3>
		<Link className='btn btn-md btn-success' to='./'>Return to homepage</Link>
	</div>
  )
}

export default Error