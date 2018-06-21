import React from 'react';
import Product from '../component/Product';

const ProductList = ({ productList }) => {
	return(
		<div 
			style={{display: 'flex', justifyContent: 'center', flexWrap:'wrap'}}
			className='center'>
			{productList.map((prod, i) => {
	            return <Product product={prod} />
	          })
	          }
		</div>
		);
}

export default ProductList;
