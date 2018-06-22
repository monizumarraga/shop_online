import React from 'react';


const Cart = ({prod, units, prodUnits, prodPrice, discPrice}) => {
	return (
		<div 
			className="tc dib br3 pa3 ma2 grow bw2 shadow-5"
			style= {{width:'100%'}}>
			<div className="center" style={{justifyContent: 'space-around', alignItems:'flex-end'}}>
				<div className="center" style={{justifyContent: 'space-between', alignItems:'flex-end', width:'40%'}}>
					<h2>{prod}</h2>
					<div className="center" style={{justifyContent: 'space-between', alignItems:'flex-end', width:'60%'}}>
						<h3 style={{alignSelf: "flex-start"}}>{units}units</h3>
						<h3 style={{alignSelf: "flex-end"}}>total price</h3>
					</div>
				</div>
				<div className="center" style={{justifyContent: 'space-between', alignItems:'flex-end', width:'50%'}}>
				{discPrice===""
					?<h3></h3>
					:<h4>discount({discPrice})</h4>
					}
				<div className='center'
					style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
					<h4>available units: {prodUnits}</h4>
					<input 
						style ={{width:'40px', height:'25px'}}
						className="center f7" 
						type="tex" 
						/>
					<button 
						style ={{width:'60px', height:'25px'}}
						className="f7 grow link dib grey bg-light-grey"
						>Update</button>
				</div>
				</div>

			</div>
		</div>
	);
}

export default Cart;