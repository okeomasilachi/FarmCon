import React from 'react'
import './Services.css'
const Services = () => {
  return (
	<section className="container container__services" id="services" >
		<div className="row">
			<div className="heading">
				<h2 className="title">Services</h2>
				<p>What we do</p>
			</div>
		</div>
		<div className="row"> 
			<div className="cards">
				<a href="./signin.html">
					<div className="card">
						<img src="./images/information-web-icon.jpg" className="card-img-top" alt="..." />
						<div className="card-body">
							<h5 className="card-title">Information</h5>
							<p className="card-text">
								Information is power, Access to current and reliable information all agricultural practices around you..
							</p>
						</div>
					</div>
				</a>
				<a href="./maintenance.html">
					<div className="card margin-1">
						<img src="./images/mapp.jpg" className="card-img-top" alt="..." />
						<div className="card-body">
							<h5 className="card-title">Geographical Location</h5>
							<p className="card-text">
								We guide and direct you to your product location, with our technology..
							</p>
						</div>
					</div>
				</a>
				<a href="./maintenance.html">
					<div className="card margin-2">
						<img src="./images/connect.jpg" className="card-img-top" alt="..." />
						<div className="card-body">
							<h5 className="card-title">Connection</h5>
							<p className="card-text">
								We Connect consumers, farmers and agro business industries together
							</p>
						</div>
					</div>
				</a>
			</div>  
		</div>
	</section>
  )
}

export default Services