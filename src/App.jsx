import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Draw from './pages/Draw.jsx';
import Gallery from './pages/Gallery.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Payment from './pages/Payment.jsx';
import { motion } from 'framer-motion';

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
