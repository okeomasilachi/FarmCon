import React from 'react'
import './CaroSlide.css'
const CaroSlide = () => {
	return (
		<div className="row caro__slide">
			<div id="carousel-slide-indicators" className="carousel slide" data-bs-ride="true">
				<div className="carousel-indicators">
					<button type="button" data-bs-target="#carousel-slide-indicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
					<button type="button" data-bs-target="#carousel-slide-indicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
					<button type="button" data-bs-target="#carousel-slide-indicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
				</div>
				<div className="carousel-inner">
					<div className="carousel-item active">
						<img src="./images/cane.jpg" className="d-block w-100" alt="Slide 1" />
					</div>
					<div className="carousel-item">
						<img src="./images/agricultural-field.jpg" className="d-block w-100" alt="Slide 2" />
					</div>
					<div className="carousel-item">
						<img src="./images/pesticidespraying-tractor.avif" className="d-block w-100" alt="Slide 3" />
					</div>
				</div>

				<button className="carousel-control-prev" type="button" data-bs-target="#carousel-slide-indicators" data-bs-slide="prev">
					<span className="carousel-control-prev-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Previous</span>
				</button>
				<button className="carousel-control-next" type="button" data-bs-target="#carousel-slide-indicators" data-bs-slide="next">
					<span className="carousel-control-next-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Next</span>
				</button>
			</div>
		</div>
	)
}

export default CaroSlide