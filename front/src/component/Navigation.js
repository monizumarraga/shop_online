import React, { Component } from 'react';

const Navigation =({onRouteChange, isSignedIn}) => {
	if (isSignedIn) {
		return(
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
			<p 
				onClick={() => onRouteChange('signout')}
				className='f3 link dim black underline pa3 pointer'>Sign Out</p>
			</nav>
		);
	} else {
		return(
			<nav style={{display: 'flex', justifyContent: 'flex-end', margin:'10px'}}>
			<p 
				onClick={() => onRouteChange('signin')}
				className='f3 link dim black underline pa3 pointer'
				style={{margin:'10px'}}>Sign In</p>
			<p 
				onClick={() => onRouteChange('register')}
				className='f3 link dim black underline pa3 pointer'
				style={{margin:'10px'}}>Register</p>
			</nav>
		);		
	}
}

export default Navigation;
