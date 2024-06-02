import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

const Login = () => {
	return (

		<div className="container_fluid container__signin">
			<div className="h-100 row justify-content-center align-items-center flex-column signin__section">
				<div className="col-12 col-10 col-md-4 col-lg-4 mb-5 text-center">
					{/* <img src="./assets/images/logo.png" className="logo text-center" alt="" /> */}
					<h1>FarmCon</h1>
				</div>
				<div className="col-10 col-md-6 col-lg-4">
					<form>
						<div className="mb-3">
							<label htmlFor="InputUsername" className="form-label">User Name/Email:</label>
							<input type="text" name="username" className="form-control" id="InputUsername" />
						</div>
						<div className="mb-3">
							<label htmlFor="InputPassword1" className="form-label">Password:</label>
							<input type="password" name="password" className="form-control" id="InputPassword1" />
						</div>
						<div className="text-center">
							<button type="submit" name="submit" className="btn w-50 btn-lg me-auto">Sign in</button>
						</div>
					</form>
				</div>
				<div className="col-12 col-10 col-md-4 col-lg-4 mt-4">
					<p>Don't have an account? click here to <Link to="../register" className="text-white">Signup</Link></p>
				</div>
			</div>
		</div>
	)
}

export default Login