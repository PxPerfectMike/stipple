import React, { useState, useRef, useEffect } from 'react';

function Draw() {
	const [dotSize, setDotSize] = useState(1);
	const sizes = [1, 4, 6, 8, 10, 12, 14];
	const canvasRef = useRef(null);
	const mouseIsDown = useRef(false);
	const drawCtx = useRef(null);
	const actions = useRef([]);
	const [actionsChanged, setActionsChanged] = useState(false);

	useEffect(() => {
		drawCtx.current = canvasRef.current.getContext('2d');

		// Load actions from local storage
		const savedActions = localStorage.getItem('drawActions');
		if (savedActions) {
			actions.current = JSON.parse(savedActions);
		}
		redraw();
	}, []);

	useEffect(() => {
		// Save actions to local storage when actionsChanged is true
		if (actionsChanged) {
			localStorage.setItem('drawActions', JSON.stringify(actions.current));
			setActionsChanged(false);
		}

		// Save actions when the component is unmounted
		return () => {
			localStorage.setItem('drawActions', JSON.stringify(actions.current));
		};
	}, [actionsChanged]);

	const redraw = () => {
		drawCtx.current.clearRect(
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
		setActionsChanged(true);
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
			redraw();
		}
	};

	const handleRedo = () => {
		if (undoneActions.current.length > 0) {
			const lastUndoneAction = undoneActions.current.pop();
			actions.current.push(lastUndoneAction);
			redraw();
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

		// Reset the actions and undoneActions
		actions.current = [];
		undoneActions.current = [];

		// Set actionsChanged to true so the empty state is saved to local storage
		setActionsChanged(true);
	};

	return (
		<div className='App'>
			<p style={{ userSelect: 'none' }}>Draw</p>
			<canvas
				ref={canvasRef}
				width={window.innerWidth / 1.2}
				height={window.innerHeight / 1.2}
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
				onMouseMove={handleMouseMove}
				style={{
					display: 'block',
					float: 'right',
					marginRight: '3%',
					background: '#070606',
					border: '3px solid #f5f5f5',
				}}
			></canvas>
			<div className='button-group' style={{ zIndex: 2 }}>
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
	);
}

export default Draw;
