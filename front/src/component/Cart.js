import React from 'react';

//const Product = ({name, email, id}) => {
const Cart = ({Cart}) => {
	return (
		<div 
			className="tc dib br3 pa3 ma2 grow bw2 shadow-5"
			style= {{width:'100%'}}>
			<div className="center" style={{justifyContent: 'space-around', alignItems:'flex-end'}}>
				<div className="center" style={{justifyContent: 'space-between', alignItems:'flex-end', width:'60%'}}>
				<h2>Cart.["name"]</h2>
				<h3>Cart.["total_units"]</h3>
				<h3>total price</h3>
				</div>
				<div className="center" style={{justifyContent: 'space-between', alignItems:'flex-end', width:'30%'}}>
				<h4>discount</h4>
				<div className='center'
					style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
					<h4>units</h4>
					<input 
						style ={{width:'50px', height:'25px'}}
						className="center f7" 
						type="tex" 
						/>
					<button 
						style ={{width:'50px', height:'25px'}}
						className="f7 grow link dib grey bg-light-grey"
						>Update</button>
				</div>
				</div>

			</div>
		</div>
	);
}

export default Cart;