import React from 'react'
import './About.css'
const About = () => {
	return (
		<section className="container container__about" id="about" >
			<div className="row">
				<div className="heading">
					<h2 className="title">About</h2>
					<p>Who we are</p>
				</div>
			</div>
			<div className="row">
				<div className="col-12 col-md-6 col-lg-6 about_info mx-auto">
					<div>
						<h3 className='title-2'>Our History</h3>
						<p>Mission & Visson?</p>
					</div>
					<div className='body'>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Iste impedit placeat molestiae odit! Quam libero illum
							necessitatibus incidunt eaque, ipsa eum explicabo nam esse
							eos quis velit adipisci voluptatum qui!
						</p>
					</div>
				</div>
				<div className="col-12 col-md-6 col-lg-6 mx-auto">
					<img src='./images/green-farmland.webp' className="dp_image" alt='FarmCon' />
				</div>
			</div>
			<div className="row">
				<div className="heading">
					<h2 className="title">Our Team</h2>
				</div>
			</div>
			<div className="row">
				<div className="cards">
					<div className="card">
						<img src="./images/avatar.png" className="card-img-top" alt="..." />
						<div className="card-body">
							<h5 className="card-title">Okeomasilachi onyedibia</h5>
							<p className="card-text">
								<b>Role:</b> Backend Engineer
							</p>
						</div>
					</div>
					<div className="card">
						<img src="./images/avatar.png" className="card-img-top" alt="..." />
						<div className="card-body">
							<h5 className="card-title">Ogunsanya Taofeeq</h5>
							<p className="card-text">
								<b>Role:</b> Frontend Engineer
							</p>
						</div>
					</div>
					<div className="card">
						<img src="./images/avatar.png" className="card-img-top" alt="..." />
						<div className="card-body">
							<h5 className="card-title">Khadijat Rasaq</h5>
							<p className="card-text">
								<b>Role:</b> Backend Engineer
							</p>
						</div>
					</div>
					<div className="card">
						<img src="./images/avatar.png" className="card-img-top" alt="..." />
						<div className="card-body">
							<h5 className="card-title">Aliyu Musa Kala-kala</h5>
							<p className="card-text">
								<b>Role:</b> Frontend Engineer
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default About