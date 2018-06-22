import React from 'react';
import Product from '../component/Product';

const ProductList = ({ productList, userCart, user, loadUser, onMenuChange }) => {
	return(
		<div 
			style={{display: 'flex', justifyContent: 'center', flexWrap:'wrap'}}
			className='center'>
			{productList.map((prod, i) => {
				return <Product 
						prod={prod} 
						userCart={userCart}
						user={user}
						loadUser={loadUser}
						onMenuChange={onMenuChange}
						/>
	          })
	          }
		</div>
		);
}

export default ProductList;
