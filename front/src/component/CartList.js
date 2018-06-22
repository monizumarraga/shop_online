import React from 'react';
import Cart from '../component/Cart';

const CartList = ({ userCart, productList, totalprice }) => {
	return (
		<div 
			className='center' style={{flexDirection: 'column'}}>
			{!Object.keys(userCart)[0]
				?<h1>`No products listed in the cart`</h1>
				:<div>
					<div className='center' style={{justifyContent: 'flex-end', alignItems:'flex-end', flexDirection: 'column'}}>
					{
						Object.keys(userCart).map((prod,i)=>{
							let productSel=productList.filter((product, i) => {
								return product["code"]===prod
					          })
						return <Cart 
				            		prod={prod}
				            		units={userCart[prod]}
				            		prodUnits={productSel[0]["units"]}
				            		prodPrice={productSel[0]["price"]}
				            		discPrice={productSel[0]["discount"]}
				            		/>
						})
					}
				    </div>
					<p className="center" style={{justifyContent: 'flex-end', alignItems:'flex-end'}}>
						<h2>Total price {totalprice} €</h2>
					</p>
				</div>
			}	
		</div>
	);
}

export default CartList;

