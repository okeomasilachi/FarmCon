import React from 'react'

const Editprofile = () => {
  return (
	<div className="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
	<div className="modal-dialog">
	  <div className="modal-content">
		<div className="modal-header">
		  <h1 className="modal-title fs-5" id="editModalLabel">Edit User</h1>
		  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		</div>
		<form action="#" method="POST" enctype="multipart/form-data">
			<div className="modal-body">
				<div className="mb-3">
					<label for="editInputFirstname" className="form-label">First Name</label>
					<input type="text" className="form-control py-2" id="editInputFirstname" />
				</div>
				<div className="mb-3">
					<label for="editInputLastname" className="form-label">Last Name</label>
					<input type="text" className="form-control py-2" id="editInputLastname" />
				</div>
				<div className="mb-3">
					<label for="editInputPhone" className="form-label">Contact</label>
					<input type="text" className="form-control py-2" id="editInputPhone" />
				</div>
				<div className="mb-3">
					<label for="editInputusername" className="form-label">Username</label>
					<input type="text" className="form-control py-2" id="editInputusername" />
				</div>
				<div className="mb-3">
					<label for="editInputPassword1" className="form-label">Password</label>
					<input type="password" className="form-control py-2" id="editInputPassword1" />
				</div>
				<div className="mb-3">
					<label for="editInputPassword2" className="form-label">Confirm Password</label>
					<input type="password" className="form-control py-2" id="editInputPassword2" />
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

export default Editprofile