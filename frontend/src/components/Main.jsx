import React from "react";
import "./Main.css";
const Main = () => {
  return (
    <main class="col-md-9 ms-sm-auto bg-light col-lg-10 px-md-4">
      <div class="d-flex justify-content-even align-items-center flex-wrap flex-md-nowrap gap-5 align-items-center pt-3 pb-2 mb-3 border-bottom">
		<div class=" mb-2 mb-md-0">
				<button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse"
					data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false"
					aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
		</div>
		<h1 class="h2">Dashboard</h1>
      </div>
      <section class="container container__data">
        <div class="row">
          <div class="cards">
            <div class="card">
              <div class="card-body">
                <h2>3</h2>
                <p>No. of Admin</p>
              </div>
            </div>
            <div class="card">
              <div class="card-body">
                <h2>400</h2>
                <p>No. of Agro Products</p>
              </div>
            </div>
            <div class="card">
              <div class="card-body">
                <h2>2000</h2>
                <p>No. of Users</p>
              </div>
            </div>
          </div>
        </div>
		<div className="row mt-2">
			<div className="col-12 chart">
				<h1>Chart</h1>
			</div>
		</div>
      </section>
    </main>
  );
};

export default Main;
