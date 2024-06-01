import React from 'react'

const Paginations = ({totalPosts, postsPerPage, setCurrentPage, currentPage}) => {
	let pages = [];

	for (let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++) {
		pages.push(i);
	}

  return (
	<div className='btn-pagination text-center d-flex gap-2 justify-content-center'>
		{pages.map((page, index) => {
		return <button 
		className={'btn btn-md p-2 px-3 '+ (page === currentPage ? 'active': '')} 
		key={index} 
		onClick={()=> setCurrentPage(page)}
		
		>
			{page}
		</button>
	})
}
	</div>
  )
}

export default Paginations