import React from 'react'
import './Footer.css'
const Footer = () => {
	return (
		<div className="container-fluid container__footer">
			<footer className="py-5">
				<div className="row">
					<div className="col-6 col-md-3 mb-3">
						<h5>Navigation</h5>
						<ul className="nav flex-column">
							<li className="nav-item mb-2"><a href="./home" className="nav-link p-0 ">Home</a></li>
							<li className="nav-item mb-2"><a href="#contact" className="nav-link p-0 ">Contact</a></li>
							<li className="nav-item mb-2"><a href="#about" className="nav-link p-0 ">About</a></li>
							<li className="nav-item mb-2"><a href="#services" className="nav-link p-0 ">Services</a></li>
						</ul>
					</div>

					<div className="col-6 col-md-3  mb-3">
						<h5>Hyperlinks</h5>
						<ul className="nav flex-column">
							<li className="nav-item mb-2"><a href="./products" className="nav-link p-0 ">Products</a></li>
							<li className="nav-item mb-2"><a className="nav-link p-0"
								href="./agriculture">Agriculture</a></li>
							<li className="nav-item mb-2"><a className="nav-link p-0"
								href="./states">States</a></li>
							<li className="nav-item mb-2"><a className="nav-link p-0"
								href="./support">Support</a></li>
							<li className="nav-item mb-2"></li>
						</ul>
					</div>

					<div className="col-12 col-md-6 mb-3 mx-auto">
						<div className="row">
							<div className="col-12 my-4">
								<a className="navbar-brand" href="./home">
									{/* <img src="./assets/images/logo-1.png" className="brand" alt="FarmCon" /> */}
									<h1>FarmCon</h1>
								</a>
							</div>
							<div className="col-12">
								<form>
									<h5>Subscribe to our newsletter</h5>
									<p>Monthly digest of what's new and exciting from us.</p>
									<div className="d-flex flex-column flex-sm-row w-100 gap-2">
										<label for="newsletter1" className="visually-hidden">Email address</label>
										<input id="newsletter1" type="text" className="form-control"
											placeholder="Email address" />
										<button className="btn btn-success" type="button">Subscribe</button>
									</div>
								</form>
							</div>
						</div>

					</div>
				</div>

				<div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
					<p>&copy; 2022 Company, Inc. All rights reserved.</p>
				</div>
			</footer>
		</div>
	)
}

export default Footer