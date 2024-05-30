import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
	<section className="container_sidebar">
		<nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
				<div class="position-sticky sidebar-sticky">
					<div className='sidebar-brand'>
						<h2 className='brand'>FarmCon</h2>
					</div>
					<ul class="nav flex-column">
						<li class="nav-item">
							<Link class="nav-link active" aria-current="page" to="../dashboard">
								<span data-feather="home" class="align-text-bottom"></span>
								Dashboard
							</Link>
						</li>
						<li class="nav-item">
							<Link class="nav-link" to="../admin">
								<span data-feather="users" class="align-text-bottom"></span>
								Admin
							</Link>
						</li>
						<li class="nav-item">
							<Link class="nav-link" to="../products">
								<span data-feather="file" class="align-text-bottom"></span>
								Products
							</Link>
						</li>
						<li class="nav-item">
							<Link class="nav-link" to="../user">
								<span data-feather="tablet" class="align-text-bottom"></span>
								User
							</Link>
						</li>
						<li class="nav-item">
							<Link class="nav-link" to="../profile">
								<span data-feather="user" class="align-text-bottom"></span>
								Settings
							</Link>
						</li>
					</ul>
					<div class="profile-dp">
						<img src="../assets/images/logo.png" alt="profile" />
					</div>
				</div>
			</nav>
	</section>
  )
}

export default Sidebar