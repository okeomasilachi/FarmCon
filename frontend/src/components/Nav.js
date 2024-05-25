import React from 'react'

import './Nav.css'

const Nav = () => {
	return (
		<nav className="navbar navbar-expand-lg fixed-top p-4">
			<div className="container">
				<a className="navbar-brand" href="./home">
					{/* <img src="./assets/images/logo-1.png" className="brand" alt="Sevenskies" /> */}
					<h1>FarmCon</h1>
				</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse justify-content-end" id="navbarText">
					<ul className="navbar-nav mb-2 mb-lg-0 mx-5">
						<li className="nav-item">
							<a className="nav-link" href="./states">States</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="./products">Products</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="./agriculture">Agriculture</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#services">Services</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#about">About us</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#contact">Contact</a>
						</li>
						<li className="">
							<a className="btn-sm-alt" href="./login">Signin</a>
						</li>
					</ul>
					
				</div>
			</div>
		</nav>
	)
}

export default Nav