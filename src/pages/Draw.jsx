import React, { useState, useRef, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

function Draw() {
	const [dotSize, setDotSize] = useState(1);
	const sizes = [1, 4, 6, 8, 10, 12, 14];
	const canvasRef = useRef(null);
	const mouseIsDown = useRef(false);
	const drawCtx = useRef(null);
	const actions = useRef([]);
	const location = useLocation();

	const canvasDimensions = location.state?.canvasDimensions;
	const backgroundColor = location.state?.backgroundColor;

	if (!canvasDimensions || !backgroundColor) {
		return null;
	}

	const [drawing, setDrawing] = useState({
		canvasDimensions,
		backgroundColor,
		actions: [],
	});

	useEffect(() => {
		const removeLocalStorageItem = () => {
			localStorage.removeItem('drawActions');
		};

		return () => {
			removeLocalStorageItem();
		};
	}, [location]);

	useEffect(() => {
		if (!canvasRef.current) {
			return;
		}

		const ctx = canvasRef.current.getContext('2d');
		drawCtx.current = ctx;

		// Set canvas dimensions and background color
		canvasRef.current.width = canvasDimensions.width;
		canvasRef.current.height = canvasDimensions.height;
		drawCtx.current.fillStyle = backgroundColor;
		drawCtx.current.fillRect(
			0,
			0,
			canvasRef.current.width,
			canvasRef.current.height
		);

		// Load actions from local storage
		const savedActions = localStorage.getItem('drawActions');
		if (savedActions) {
			actions.current = JSON.parse(savedActions);
		}
		redraw();
	}, []);

	const redraw = () => {
		drawCtx.current.clearRect(
			0,
			0,
			canvasRef.current.width,
			canvasRef.current.height
		);

		// Fill the canvas with the background color
		drawCtx.current.fillStyle = backgroundColor;
		drawCtx.current.fillRect(
			0,
			0,
			canvasRef.current.width,
			canvasRef.current.height
		);

		actions.current.forEach((action) => {
			action.dots.forEach((dot) => {
				drawCtx.current.beginPath();
				drawCtx.current.arc(dot.x, dot.y, sizes[dot.size] / 2, 0, Math.PI * 2);
				drawCtx.current.fillStyle = '#f5f5f5';
				drawCtx.current.fill();
			});
		});
	};

	const saveActionsToLocalStorage = () => {
		localStorage.setItem('drawActions', JSON.stringify(actions.current));
	};

	const handleAddDot = (event) => {
		const rect = canvasRef.current.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		const dot = { x, y, size: dotSize };

		// Draw the dot immediately without redrawing the entire canvas
		drawCtx.current.beginPath();
		drawCtx.current.arc(x, y, sizes[dot.size] / 2, 0, Math.PI * 2);
		drawCtx.current.fillStyle = '#f5f5f5';
		drawCtx.current.fill();

		actions.current[actions.current.length - 1].dots.push(dot);
		saveActionsToLocalStorage(); // Directly call the save function
	};

	const maxUndoCapacity = 20; // <-- A greater maxUndoCapacity can me monetized

	const handleMouseDown = (event) => {
		mouseIsDown.current = true;
		if (actions.current.length >= maxUndoCapacity) {
			actions.current.shift();
		}
		actions.current.push({ dots: [] });
		handleAddDot(event);
	};

	const handleMouseUp = () => {
		mouseIsDown.current = false;
	};

	const handleMouseMove = (event) => {
		if (mouseIsDown.current) {
			handleAddDot(event);
		}
	};

	const undoneActions = useRef([]);

	const handleUndo = () => {
		if (actions.current.length > 0) {
			const lastAction = actions.current.pop();
			undoneActions.current.push(lastAction);

			// Clear the canvas
			drawCtx.current.clearRect(
				0,
				0,
				canvasRef.current.width,
				canvasRef.current.height
			);

			// Fill the canvas with the background color
			drawCtx.current.fillStyle = backgroundColor;
			drawCtx.current.fillRect(
				0,
				0,
				canvasRef.current.width,
				canvasRef.current.height
			);

			// Redraw all actions except the last one
			actions.current.forEach((action) => {
				action.dots.forEach((dot) => {
					drawCtx.current.beginPath();
					drawCtx.current.arc(
						dot.x,
						dot.y,
						sizes[dot.size] / 2,
						0,
						Math.PI * 2
					);
					drawCtx.current.fillStyle = '#f5f5f5';
					drawCtx.current.fill();
				});
			});

			saveActionsToLocalStorage();
		}
	};

	const handleRedo = () => {
		if (undoneActions.current.length > 0) {
			const lastUndoneAction = undoneActions.current.pop();
			actions.current.push(lastUndoneAction);

			// Draw the last undone action on the canvas
			lastUndoneAction.dots.forEach((dot) => {
				drawCtx.current.beginPath();
				drawCtx.current.arc(dot.x, dot.y, sizes[dot.size] / 2, 0, Math.PI * 2);
				drawCtx.current.fillStyle = '#f5f5f5';
				drawCtx.current.fill();
			});

			saveActionsToLocalStorage();
		}
	};

	const handleIncrement = () => {
		setDotSize((prevSize) => {
			if (prevSize < sizes.length - 1) {
				return prevSize + 1;
			}
			return prevSize;
		});
	};

	const handleDecrement = () => {
		setDotSize((prevSize) => {
			if (prevSize > 0) {
				return prevSize - 1;
			}
			return prevSize;
		});
	};

	const handleClear = () => {
		// Clear the canvas
		drawCtx.current.clearRect(
			0,
			0,
			canvasRef.current.width,
			canvasRef.current.height
		);

		// Fill the canvas with the background color
		drawCtx.current.fillStyle = backgroundColor;
		drawCtx.current.fillRect(
			0,
			0,
			canvasRef.current.width,
			canvasRef.current.height
		);

		// Reset the actions and undoneActions
		actions.current = [];
		undoneActions.current = [];

		// Save the empty state to local storage
		saveActionsToLocalStorage();
	};

	return (
		<div className='draw'>
			<div className='controls'>
				<Link to='/'>Home</Link>
				<p style={{ userSelect: 'none' }}>Draw</p>
				<div className='button-group'>
					<button style={{ userSelect: 'none' }} onClick={handleIncrement}>
						+dotSize
					</button>
					<p style={{ userSelect: 'none' }}>{dotSize}</p>
					<button style={{ userSelect: 'none' }} onClick={handleDecrement}>
						-dotSize
					</button>
				</div>
				<div className='undo-redo-buttons'>
					<button style={{ userSelect: 'none' }} onClick={handleUndo}>
						Undo
					</button>
					<button style={{ userSelect: 'none' }} onClick={handleRedo}>
						Redo
					</button>
				</div>
				<div className='clear-button'>
					<button style={{ userSelect: 'none' }} onClick={handleClear}>
						Clear
					</button>
				</div>
			</div>
			<canvas
				ref={canvasRef}
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
				onMouseMove={handleMouseMove}
				className='drawing-canvas'
			></canvas>
		</div>
	);
}

export default Draw;
