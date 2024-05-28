import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faRightToBracket} from '@fortawesome/free-solid-svg-icons'

const Nav = () => {
	return (
		<nav className="navbar navbar-expand-lg fixed-top p-3">
			<div className="container">
				<Link className="navbar-brand" to="../">
					{/* <img src="./assets/images/logo-1.png" className="brand" alt="Sevenskies" /> */}
					<h1>FarmCon</h1>
				</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse justify-content-end" id="navbarText">
					<ul className="navbar-nav mb-2 mb-lg-0 mx-5">
						<li className="nav-item">
							<Link className="nav-link" to="../dashboard">Dashboard</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="../agriculture">Agriculture</Link>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="../#services">Services</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="../#about">About us</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="../#contact">Contact</a>
						</li>
						<li className="">
							<Link className="btn-sm-alt" to="../login">Signin &nbsp; <FontAwesomeIcon icon={faRightToBracket} /></Link>
						</li>
					</ul>
					
				</div>
			</div>
		</nav>
	)
}

export default Nav