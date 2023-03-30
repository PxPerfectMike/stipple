import React from 'react';
import { Link } from 'react-router-dom';
// import './App.css';

function Home() {
	return (
		<div>
			<p>Home</p>
			<Link to='/draw'>Draw</Link>
		</div>
	);
}

export default Home;
