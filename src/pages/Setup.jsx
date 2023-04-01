import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Setup() {
	const [canvasDimensions, setCanvasDimensions] = useState({
		width: 800,
		height: 600,
	});
	const [backgroundColor, setBackgroundColor] = useState('#aaaaaa');
	const navigate = useNavigate();

	const handleSetCanvasSize = (width, height) => {
		setCanvasDimensions({ width, height });
	};

	const handleSetColor = (color) => {
		setBackgroundColor(color);
	};

	const handleStartDrawing = () => {
		// Pass the settings to the Draw component via state
		navigate('/draw', { state: { canvasDimensions, backgroundColor } });
	};

	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<div className='setup'>
			<h2>Canvas Size</h2>
			<button onClick={() => handleSetCanvasSize(800, 600)}>Landscape</button>
			<button onClick={() => handleSetCanvasSize(600, 800)}>Portrait</button>
			<button onClick={() => handleSetCanvasSize(600, 600)}>Square</button>

			<h2>Background Color</h2>
			<input
				type='color'
				value={backgroundColor}
				onChange={(e) => handleSetColor(e.target.value)}
			/>

			<div className='buttons'>
				<button onClick={handleStartDrawing}>Start Drawing</button>
				<button onClick={handleGoBack}>Back</button>
			</div>
		</div>
	);
}

export default Setup;
