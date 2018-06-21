import React from 'react';
import prod from './mug.jpg';


const Product = ({code, name, price, units, discount}) => {
	return (
		<div 
			style={{border:'3px solid grey'}}
			className="tc dib br3 pa3 ma2 grow bw2 shadow-5"
		style= {{width:'200px'}}>
			<img style= {{paddingTop: '20px'}} src={prod} alt="prod" width='150px' height='auto'/> 
			<div>
				<h3>{code}</h3>
				<h2>{name}</h2>
				<div style={{display: 'flex', justifyContent: 'space-around'}}>
					<h3>{price}</h3>
					<h3>{discount}</h3>
				</div>
				<div className='center'
					style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
					<h3>{units}</h3>
					<input 
						style ={{width:'50px', height:'25px'}}
						className="center f7" 
						type="tex" 
						/>
					<button 
						style ={{width:'50px', height:'25px'}}
						className="f7 grow link dib grey bg-light-grey"
						>Buy</button>
				</div>

			</div>
		</div>
	);
}

export default Product;