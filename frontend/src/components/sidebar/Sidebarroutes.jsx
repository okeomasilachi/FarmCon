import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faGear, faUserGroup  } from "@fortawesome/free-solid-svg-icons";
import { faProductHunt } from "@fortawesome/free-brands-svg-icons";

let id = 0;

export const sidebarRoutes = [
	{
		id: id++,
		to: '../dashboard',
		title: 'Dashboard',
		icon: <FontAwesomeIcon className='me-2' icon={faHome} />,
	},
	{
		id: id++,
		to: '../admin',
		title: 'Admin',
		icon: <FontAwesomeIcon className='me-2' icon={faUser} />,
	},
	{
		id: id++,
		to: '../products',
		title: 'Products',
		icon: <FontAwesomeIcon className='me-2' icon={faProductHunt} />,
	},
	{
		id: id++,
		to: '../user',
		title: 'User',
		icon: <FontAwesomeIcon className='me-2' icon={faUserGroup} />,
	},
	{
		id: id++,
		to: '../profile',
		title: 'Settings',
		icon: <FontAwesomeIcon className='me-2' icon={faGear} />,
	},
]