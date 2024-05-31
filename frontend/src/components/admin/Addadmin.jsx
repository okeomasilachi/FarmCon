import React from 'react'

const Addadmin = () => {
  return (
	
	<div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
	  <div className="modal-dialog">
		<div className="modal-content">
		  <div className="modal-header">
			<h1 className="modal-title fs-5" id="addModalLabel">Add User</h1>
			<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		  </div>
		  <form action="#" >
			  <div className="modal-body">
				  <div className="mb-3">
					  <label htmlFor="addInputFirstname" className="form-label">First Name</label>
					  <input type="text" className="form-control py-2" id="addInputFirstname" />
				  </div>
				  <div className="mb-3">
					  <label htmlFor="addInputLastname" className="form-label">Last Name</label>
					  <input type="text" className="form-control py-2" id="addInputLastname" />
				  </div>
				  <div className="mb-3">
					  <label htmlFor="addInputemail" className="form-label">Email</label>
					  <input type="email" className="form-control py-2" id="addInputemail" />
				  </div>
				  <div className="mb-3">
					  <label htmlFor="addInputPassword1" className="form-label">Password</label>
					  <input type="password" className="form-control py-2" id="addInputPassword1" />
				  </div>
				  <div className="mb-3">
					  <label htmlFor="addInputPassword2" className="form-label">Confirm Password</label>
					  <input type="password" className="form-control py-2" id="addInputPassword2" />
				  </div>
			  </div>
			  <div className="modal-footer">
				  <button type="button" className="btn btn-primary">Save changes</button>
			  </div>
		  </form>
		</div>
	  </div>
	</div>
  
  )
}

export default Addadmin