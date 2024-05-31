import React from 'react'
import './Contact.css' 

// IMPORTING REACT FONTAWESOME 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// ADD REACT FONTAWESOME ICON 
// import {faPaperPlane} from '@fortawesome/free-brands-svg-icons'
import {faPaperPlane} from '@fortawesome/free-regular-svg-icons'


const Contact = () => {
  return (
	<section className="container container__contact" id="contact">
				<div className="row">
					<div className="col-12 col-md-6 col-lg-6 title">
						<div>
							<h2>Connect With Us</h2>
							<p>How can we help you?</p>
						</div>
					</div>
					<div className="col-12 col-md-6 col-lg-6">
						<form>
							<div className="mb-3">
								<label htmlFor="name" className="form-label">Full Name</label>
								<input type="email" className="form-control" id="name" placeholder="Ahmed Bello" />
							</div>
							<div className="mb-3">
								<label htmlFor="email" className="form-label">Email address</label>
								<input type="email" className="form-control" id="email" placeholder="name@example.com" />
							</div>
							<div className="mb-3">
								<label htmlFor="message" className="form-label">Message</label>
								<textarea className="form-control" id="message" placeholder="Type your message here..." rows="10"></textarea>
							</div>
							<div className="text-center">
								<button type="submit" className="btn-lg w-50 py-3 me-auto">Send &nbsp; <FontAwesomeIcon icon={faPaperPlane}/></button>
							</div>
						</form>
					</div>
				</div>
			</section>
  )
}

export default Contact