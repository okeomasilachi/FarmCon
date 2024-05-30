import React from 'react'
import Nav from '../nav/Nav'
import './Header.css'
import CaroSlide from '../carousel/CaroSlide'

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