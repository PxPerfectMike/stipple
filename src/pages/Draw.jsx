import React from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Draw() {
	const [holeCount, setholeCount] = useState([]);

	const handleAddHole = (event) => {
		const rect = event.currentTarget.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		setholeCount((prevholeCount) => [
			...prevholeCount,
			{ x: x - 50, y: y - 50 },
		]);
	};

	return (
		<div className='App draw' onClick={handleAddHole}>
			<p>Draw</p>
			<Link to='/'>Home</Link>
			{holeCount.map((hole, index) => (
				<motion.svg
					key={index}
					className='hole'
					style={{ left: hole.x, top: hole.y }}
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.5 }}
					width='100'
					height='100'
				></motion.svg>
			))}
		</div>
	);
}

export default Draw;
