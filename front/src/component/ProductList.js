import React from 'react';
import Product from '../component/Product';

const ProductList = ({ productList, userCart, user, loadUser }) => {
	return(
		<div 
			style={{display: 'flex', justifyContent: 'center', flexWrap:'wrap'}}
			className='center'>
			{productList.map((prod, i) => {
				return <li 
						style={{listStyleType: 'none'}}
						key={i.toString()}>
						<Product 
							prod={prod} 
							userCart={userCart}
							user={user}
							loadUser={loadUser}
							/>
						</li>
	          })
	          }
		</div>
		);
}

export default ProductList;
