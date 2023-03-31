import React from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
// import { Link } from 'react-router-dom';

function Draw() {
	const [dotCount, setdotCount] = useState([]);
	const [dotSize, setdotSize] = useState(1);
	const sizes = [1, 4, 6, 8, 10, 12, 14];

	const handleAddDot = (event) => {
		const rect = event.currentTarget.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		setdotCount((prevdotCount) => [
			...prevdotCount,
			{ x: x, y: y, size: dotSize },
		]);
		console.log(JSON.stringify(dotCount));
		let interval;
		const addDotAtInterval = () => {
			interval = setInterval(() => {
				setdotCount((prevdotCount) => [...prevdotCount, { x: x, y: y }]);
			}, 1000); // <-- change this value to change the interval
		};

		const stopAddingDots = () => {
			clearInterval(interval);
			document.removeEventListener('mouseup', stopAddingDots);
		};
		addDotAtInterval();
		document.addEventListener('mouseup', stopAddingDots);
	};

	const handleIncrement = () => {
		setdotSize((prevSize) => {
			if (prevSize < sizes.length - 1) {
				return prevSize + 1;
			}
			return prevSize;
		});
	};

	const handleDecrement = () => {
		setdotSize((prevSize) => {
			if (prevSize > 0) {
				return prevSize - 1;
			}
			return prevSize;
		});
	};

	return (
		<div className='App' onClick={handleAddDot}>
			<p style={{ height: '80vh', userSelect: 'none' }}>Draw</p>
			<div className='button-group' style={{ zIndex: 2 }}>
				<button style={{ userSelect: 'none' }} onClick={handleIncrement}>
					+dotSize
				</button>
				<p style={{ userSelect: 'none' }}>{dotSize}</p>
				<button style={{ userSelect: 'none' }} onClick={handleDecrement}>
					-dotSize
				</button>
			</div>
			{dotCount.map((dot, index) => (
				<motion.svg
					key={index}
					className='dot'
					style={{
						zIndex: 1,
						left: dot.x,
						top: dot.y,
						width: `${sizes[dotSize]}px`,
						height: `${sizes[dotSize]}px`,
						backgroundColor: '#f5f5f5',
					}}
					initial={{ opacity: 0.7, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.5 }}
				></motion.svg>
			))}
			<div className='draw-area'></div>
		</div>
	);
}

export default Draw;
