import React from 'react';
import Cart from '../component/Cart';

const CartList = () => {
	return (
		<div 
			className='center' style={{flexDirection: 'column'}}>
			<div className='center'>
				<Cart />
			</div>
			<p className="center" style={{justifyContent: 'flex-end', alignItems:'flex-end'}}>
				<h2>Total price</h2>
				<h3>total price</h3>
			</p>
		</div>
	);
}

export default CartList;