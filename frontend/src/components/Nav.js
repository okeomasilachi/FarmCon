import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

const Nav = () => {
	return (
		<nav className="navbar navbar-expand-lg fixed-top p-4">
			<div className="container">
				<Link className="navbar-brand" to="./home">
					{/* <img src="./assets/images/logo-1.png" className="brand" alt="Sevenskies" /> */}
					<h1>FarmCon</h1>
				</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse justify-content-end" id="navbarText">
					<ul className="navbar-nav mb-2 mb-lg-0 mx-5">
						<li className="nav-item">
							<Link className="nav-link" to="./states">States</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="./products">Products</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="./agriculture">Agriculture</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="#services">Services</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="#about">About us</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="#contact">Contact</Link>
						</li>
						<li className="">
							<Link className="btn-sm-alt" to="./login">Signin</Link>
						</li>
					</ul>
					
				</div>
			</div>
		</nav>
	)
}

export default Nav