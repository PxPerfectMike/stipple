import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Draw from './pages/Draw.jsx'; // Updated import statement
import Gallery from './pages/Gallery.jsx'; // Updated import statement
import Home from './pages/Home.jsx'; // Updated import statement
import Login from './pages/Login.jsx'; // Updated import statement
import Payment from './pages/Payment.jsx'; // Updated import statement

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/draw' element={<Draw />} />
				<Route path='/gallery' element={<Gallery />} />
				<Route path='/login' element={<Login />} />
				<Route path='/payment' element={<Payment />} />
			</Routes>
		</div>
	);
}

export default App;
