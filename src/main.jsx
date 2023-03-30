import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './index.css';
import {
	createBrowserRouter as CB,
	RouterProvider as RP,
} from 'react-router-dom';

const router = CB([
	{
		path: '*',
		element: <App />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RP router={router} />
	</React.StrictMode>
);
