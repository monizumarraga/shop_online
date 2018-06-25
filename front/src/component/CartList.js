import React from 'react';
import Cart from '../component/Cart';

const CartList = ({ userCart, productList, totalprice, user, loadUser, onMenuChange }) => {
	return (
		<div 
			className='center' style={{flexDirection: 'column'}}>
			{!Object.keys(userCart)[0]
				?<h1>`No products listed in the cart`</h1>
				:<div>
					<div>
					{
						Object.keys(userCart).map((prod,i)=>{
							let productSel=productList.filter((product, i) => {
								return product["code"]===prod
					          })
						return <li
									className='center' style={{justifyContent: 'flex-end', alignItems:'flex-end', flexDirection: 'column'}}
									style={{listStyleType: 'none', border:'1px solid grey', borderRadius:'10px', padding: '5px', margin:'10px', backgroundColor:'rgba(203, 221, 240, 1)'}}
									key={i.toString()}>
								<Cart 
				            		prod={prod}
				            		units={userCart[prod]}
				            		prodDesc={productSel[0]["name"]}
				            		prodUnits={productSel[0]["units"]}
				            		prodPrice={productSel[0]["price"]}
				            		discPrice={productSel[0]["discount"]}
									loadUser={loadUser}
									user= {user}
				            		/>
				            	</li>
						})
					}
				    </div>
					<div 
						className="center" 
						style={{justifyContent: 'flex-end', alignItems:'flex-end', flexDirection: 'column', margin:'20px'}}>
						<h2>Total price {totalprice} €</h2>
						<div className="form-actions">
				            <button 
				      			onClick={() => onMenuChange('Pay')}
				            	type="submit" 
				            	className="btn btn-primary"
				            	>Pay</button>
			          </div>
			        </div>
				</div>
			}	
		</div>
	);
}

export default CartList;

