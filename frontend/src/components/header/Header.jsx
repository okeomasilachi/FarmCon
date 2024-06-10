import React from 'react'
import Nav from '../nav/Nav'
import CaroSlide from '../carousel/CaroSlide'
import { RecoilRoot } from 'recoil'

const Header = () => {
  return (
	  <section className="container container__header" id="header">
		<header>
			<div className="row">
			<RecoilRoot><Nav /></RecoilRoot> 
			</div>
			<CaroSlide />
		</header>
	</section>
  )
}

export default Header