import React from 'react'

const Addproduct = () => {
  return (
	<div
      className="modal fade"
      id="addModal"
      tabIndex="-1"
      aria-labelledby="addModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="addModalLabel">
              Add Product
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form action="#" >
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="addInputFirstname" className="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  className="form-control py-2"
                  id="addInputFirstname"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="addInputLastname" className="form-label">
                  Location
                </label>
                <input
                  type="text"
                  className="form-control py-2"
                  id="addInputLastname"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="addInputusername" className="form-label">
                 Cultivation Duration:
                </label>
                <input
                  type="text"
                  className="form-control py-2"
                  id="addInputusername"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="addInputDate" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control py-2"
                  id="addInputDate"
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

export default Addproduct