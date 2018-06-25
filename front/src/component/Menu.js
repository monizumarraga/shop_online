import React from 'react';
import Tilt from 'react-tilt';
import logo from './logo.jpg';
import './Menu.css';

const Menu =({onMenuChange}) => {
	return (
		<div className="ma4 mt0" style={{display: 'flex', justifyContent: 'flex-start'}}>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
				<div className="Tilt-inner pa3"> 
	          		<img style= {{paddingTop: '20px'}} src={logo} className="App-logo" alt="logo" /> 
					<h1 className="App-title">Shop</h1>
				</div>
			</Tilt>
			<div className="bar" style={{width:'100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around'}}>
			<p 
				onClick={() => onMenuChange('shop')}
				className='f3 link dim black underline pa3 pointer'>Shop</p>
			<p 
				onClick={() => onMenuChange('cart')}
				className='f3 link dim black underline pa3 pointer'>Cart</p>
			<p
				onClick={() => onMenuChange('user')}
				className='f3 link dim black underline pa3 pointer'>User</p>
			</div>
		</div>
		);
}

export default Menu;