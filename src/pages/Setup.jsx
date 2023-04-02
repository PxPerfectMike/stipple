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

	const hexToRgb = (hex) => {
		const bigint = parseInt(hex.slice(1), 16);
		const r = (bigint >> 16) & 255;
		const g = (bigint >> 8) & 255;
		const b = bigint & 255;

		return `rgb(${r}, ${g}, ${b})`;
	};

	const rgbToHex = (rgb) => {
		const [r, g, b] = rgb
			.substring(4, rgb.length - 1)
			.replace(/ /g, '')
			.split(',');

		return (
			'#' +
			[r, g, b]
				.map((x) => {
					const hex = parseInt(x).toString(16);
					return hex.length === 1 ? '0' + hex : hex;
				})
				.join('')
		);
	};

	const handleStartDrawing = () => {
		navigate('/draw', { state: { canvasDimensions, backgroundColor } });
	};

	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<div className='setup'>
			<h2>Canvas Size</h2>
			<div className='canvas-options'>
				<button onClick={() => handleSetCanvasSize(800, 600)}>Landscape</button>
				<button onClick={() => handleSetCanvasSize(600, 800)}>Portrait</button>
				<button onClick={() => handleSetCanvasSize(600, 600)}>Square</button>
			</div>
			<h2>Background Color</h2>
			<div className='color-inputs'>
				<input
					type='color'
					value={backgroundColor}
					onChange={(e) => handleSetColor(e.target.value)}
				/>
				<input
					type='text'
					value={backgroundColor}
					onChange={(e) => {
						if (e.target.value.startsWith('#')) {
							handleSetColor(e.target.value);
						}
					}}
				/>
				<input
					type='text'
					value={hexToRgb(backgroundColor)}
					onChange={(e) => {
						if (e.target.value.toLowerCase().startsWith('rgb')) {
							handleSetColor(rgbToHex(e.target.value));
						}
					}}
				/>
			</div>
			<div className='canvas-preview'>
				<div
					className='preview'
					style={{
						width: `${canvasDimensions.width / 10}px`,
						height: `${canvasDimensions.height / 10}px`,
						backgroundColor: backgroundColor,
					}}
				></div>
			</div>
			<div className='buttons'>
				<button onClick={handleStartDrawing}>Start Drawing</button>
				<button onClick={handleGoBack}>Back</button>
			</div>
		</div>
	);
}

export default Setup;
