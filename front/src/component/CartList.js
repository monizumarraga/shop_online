import React from 'react';
import Cart from '../component/Cart';

const CartList = ({ CartList }) => {
	return (
		<div 
			className='center' style={{flexDirection: 'column'}}>
			{(!CartList)
				?(
					<h1>`No products listed in the cart`</h1>
				)
				:(
					<div>
					<div className='center'>
						{CartList.map((prod, i) => {
				            	return <Cart cart={prod} />
					          })
						}
				    </div>
					<p className="center" style={{justifyContent: 'flex-end', alignItems:'flex-end'}}>
						<h3>"total price"</h3>
					</p>
					</div>
				)
			}
		</div>
	);
}

export default CartList;

