import React from 'react';
import Product from '../component/Product';

const ProductList = ({ productList, userCart }) => {
	return(
		<div 
			style={{display: 'flex', justifyContent: 'center', flexWrap:'wrap'}}
			className='center'>
			{productList.map((prod, i) => {
				return <Product 
						product={prod} 
						userCart={userCart}
						/>
	          })
	          }
		</div>
		);
}

export default ProductList;
