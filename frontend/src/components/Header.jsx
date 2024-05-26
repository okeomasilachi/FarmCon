import React from 'react'
import Nav from './Nav'
import './Header.css'
import CaroSlide from './CaroSlide'

const Header = () => {
  return (
	  <section className="container container__header" id="header">
		<header>
			<div className="row">
				<Nav />
			</div>
			<CaroSlide />
		</header>
	</section>
  )
}

export default Header