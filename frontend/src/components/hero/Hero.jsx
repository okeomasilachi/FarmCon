import React from 'react'
import './Hero.css'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import { faSearch } from '@fortawesome/free-solid-svg-icons'


const Hero = () => {

  return ( 
	<section className="container container__hero">
		<div className="row title__row">
			<div className="col-12  hero_title mb-3">
				<h1>Explore agricultural products in Nigeria</h1>
				<p>Discover Nigeria's key agricultural states</p>
			</div>
			{/* <div className="col-12 hero_search">
				<FontAwesomeIcon icon={faSearch}/> &nbsp;
				<input type="text"  className='hero_input' placeholder='Search for Anything...' />
			</div> */}
		</div>
	</section>
  )
}

export default Hero