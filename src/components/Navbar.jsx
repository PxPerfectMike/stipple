import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ isLoggedIn }) {
	return (
		<nav>
			<ul>
				<li>
					<Link to='/draw'>Draw</Link>
				</li>
				<li>
					<Link to='/gallery'>Gallery</Link>
				</li>
				<li>
					<Link to='/'>Home</Link>
				</li>
				{isLoggedIn ? (
					<li>
						<a href='#'>Logout</a>
					</li>
				) : (
					<li>
						<Link to='/login'>Login</Link>
					</li>
				)}
				<li>
					<Link to='/payment'>Payment/Pricing</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
