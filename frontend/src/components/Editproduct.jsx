import React from 'react'

const Editproduct = () => {
  return (
	<div
      className="modal fade"
      id="editModal"
      tabindex="-1"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="editModalLabel">
              Edit Product
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form action="#" method="POST" enctype="multipart/form-data">
            <div className="modal-body">
              <div className="mb-3">
                <label for="editInputFirstname" className="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  className="form-control py-2"
                  id="editInputFirstname"
                />
              </div>
              <div className="mb-3">
                <label for="editInputLastname" className="form-label">
                  Location
                </label>
                <input
                  type="text"
                  className="form-control py-2"
                  id="editInputLastname"
                />
              </div>
              <div className="mb-3">
                <label for="editInputusername" className="form-label">
                 Cultivation Duration:
                </label>
                <input
                  type="text"
                  className="form-control py-2"
                  id="editInputusername"
                />
              </div>
              <div className="mb-3">
                <label for="editInputDate" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control py-2"
                  id="editInputDate"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Editproduct