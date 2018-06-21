import React from 'react';
import Product from '../component/Product';

const ProductList = ({ products }) => {
	return (
		<div 
			style={{display: 'flex', justifyContent: 'center', flexWrap:'wrap'}}
			className='center'>
			{products.map((product, i) => {
			      return <Product 
			      		code={product[i].code}
			      		name={product[i].name}
			      		price={product[i].price}
			      		units={product[i].units}
			      		discount={product[i].discount}
				      />
			  })
			}
		</div>
	);
}

export default ProductList;