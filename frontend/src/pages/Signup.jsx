import React from 'react'
import './Signup.css'
import { Link } from 'react-router-dom'



const Signup = () => {
  return (
	<div className="container_fluid container__signup">
		<div className="h-100 row justify-content-center align-items-center flex-column signup__section">
			<div className="col-12 col-10 col-md-4 col-lg-4 mb-4 text-center">
				{/* <img src="" className="logo text-center" alt="" /> */}
				<h1>FarmCon</h1>
			</div>
			<div className="col-10 col-md-6 col-lg-4">
				<form>
					<div className="mb-3">
						<label htmlFor="InputFirstname" className="form-label">First Name</label>
						<input type="text" name='fname' className="form-control py-2" id="InputFirstname" />
					</div>
					<div className="mb-3">
						<label htmlFor="InputLastname" className="form-label">Last Name</label>
						<input type="text" name='lname' className="form-control py-2" id="InputLastname" />
					</div>
					<div className="mb-3">
						<label htmlFor="Inputemail" className="form-label">Email</label>
						<input type="email" name='email' className="form-control py-2" id="Inputemail" />
					</div>
					<div className="mb-3">
						<label htmlFor="InputPassword1" className="form-label">Password</label>
						<input type="password" name='password' className="form-control py-2" id="InputPassword1" />
					</div>
					<div className="mb-3">
						<label htmlFor="InputPassword2" className="form-label">Confirm Password</label>
						<input type="password" name='cpassword' className="form-control py-2" id="InputPassword2" />
					</div>
					<div className="text-center">
						<button type="submit" name='submit' className="btn w-50 btn-lg me-auto">Sign up</button>
					</div>
				</form>
			</div>
			<div className="col-12 col-10 col-md-4 col-lg-4 mt-4">
				<p>Already have an account? click here to <Link to="../login" className='text-white'>Signin</Link></p>
			</div>
		</div>
	</div>
  )
}

export default Signup