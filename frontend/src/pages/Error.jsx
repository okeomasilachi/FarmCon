import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
	<div className='text-center'>
		<p>Oops! Error 404 Page not found..</p>
		<Link className='btn btn-lg btn-success' to='./'>Return to homepage</Link>
	</div>
  )
}

export default Error