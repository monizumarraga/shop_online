import React from 'react';
import Product from '../component/Product';
import ProductUpdate from '../component/ProductUpdate';

const ProductList = ({ productList, userCart, user, loadUser,onMenuChange, discountListName }) => {
	return(
		<div 
			style={{display: 'flex', justifyContent: 'center', flexWrap:'wrap'}}
			className='center'>
			{user["name"]==="administrator"
			?(
				productList.map((prod, i) => {
					return <li style={{listStyleType: 'none'}} key={i.toString()}>
							<div style={{border:'1px solid grey', borderRadius:'10px', padding: '5px', margin:'10px', backgroundColor:'rgba(203, 221, 240, 1)'}}>
							<ProductUpdate 
								prod={prod}
								onMenuChange={onMenuChange}
								discountListName={discountListName}
								/>
								</div>
							</li>
		          })
			)
			:(
				productList.map((prod, i) => {
					return <li style={{listStyleType: 'none'}} key={i.toString()}>
							<div style={{border:'1px solid grey', borderRadius:'10px', padding: '5px', margin:'10px', backgroundColor:'rgba(203, 221, 240, 1)'}}>
							<Product 
								prod={prod} 
								userCart={userCart}
								user={user}
								loadUser={loadUser}
								/>
								</div>
							</li>
		          })
		    )
	        }
		</div>
		);
}

export default ProductList;
