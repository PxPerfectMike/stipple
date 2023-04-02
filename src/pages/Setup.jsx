import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CirclePicker } from 'react-color';
import { colorList } from '../assets/colors.js';

function Setup() {
	const [canvasDimensions, setCanvasDimensions] = useState({
		width: 800,
		height: 600,
	});
	const [backgroundColor, setBackgroundColor] = useState('#90CAF9');
	const [colorGroup, setColorGroup] = useState('Blue');

	const navigate = useNavigate();

	const handleSetCanvasSize = (width, height) => {
		setCanvasDimensions({ width, height });
	};

	const handleSetColor = (color) => {
		setBackgroundColor(color);
	};

	const handleStartDrawing = () => {
		navigate('/draw', { state: { canvasDimensions, backgroundColor } });
	};

	const handleGoBack = () => {
		navigate(-1);
	};

	const colorNames = Object.keys(colorList);

	return (
		<div className='setup'>
			<h2>Canvas Size</h2>
			<div className='canvas-options'>
				<button onClick={() => handleSetCanvasSize(900, 600)}>Landscape</button>
				<button onClick={() => handleSetCanvasSize(600, 900)}>Portrait</button>
				<button onClick={() => handleSetCanvasSize(1080, 1080)}>Square</button>
			</div>
			<h2>Background Color</h2>
			<div className='color-buttons'>
				{colorNames.map((colorName) => {
					return (
						<button
							className='color-button'
							key={colorName}
							onClick={() => setColorGroup(colorName)}
						>
							{colorName}
						</button>
					);
				})}
			</div>
			<div className='color-inputs'>
				<CirclePicker
					color={backgroundColor}
					colors={colorList[colorGroup]}
					onChange={(color) => handleSetColor(color.hex)}
				/>
			</div>
			<div className='canvas-preview-container'>
				<div className='canvas-preview'>
					<h2>Canvas Preview</h2>
					<div
						className='preview'
						style={{
							width: `${canvasDimensions.width / 8}px`,
							height: `${canvasDimensions.height / 8}px`,
							backgroundColor: backgroundColor,
						}}
					></div>
				</div>
			</div>
			<div className='buttons'>
				<button onClick={handleStartDrawing}>Start Drawing</button>
				<button onClick={handleGoBack}>Back</button>
			</div>
		</div>
	);
}

export default Setup;
