import React from 'react';



const Product = ({product, userCart}) => {
	return (
		<div 
			style={{border:'3px solid grey'}}
			className="tc dib br3 pa3 ma2 grow bw2 shadow-5"
		style= {{width:'200px'}}>
			<img style= {{paddingTop: '20px'}} 
				src={require(`./${product["code"]}.jpg`)}
				alt={product["name"]} width='auto' height='120px'/> 
			<div>
				<h3>{product["code"]}</h3>
				<div style={{display: 'flex', justifyContent: 'space-around', alignItems:'flex-end'}}>
					<h2>{product["name"]}</h2>
					<h2>{product["price"]}€</h2>
				</div>
				<div className='center'
					onChange={this.onNumberChange}
					id={"input"+product["code"]}
					style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
					{userCart[product["code"]]
					?<h2>{userCart[product["code"]]} units</h2>
					:<h2>0 units</h2>
					}					
					<input 
						style ={{width:'50px', height:'25px'}}
						className="center f7" 
						type="tex" 
						/>
					<button 
		      			onClick={this.onSubmitUpdate}
						id={"button"+product["code"]}
						style ={{width:'50px', height:'25px'}}
						className="f7 grow link dib grey bg-light-grey"
						>Buy</button>
				</div>
					<h3>availability: {product["units"]}units</h3>
					{product["discount"]===""
					?<h3></h3>
					:<h3>discount({product["discount"]})</h3>
					}
			</div>
		</div>
	);
}

export default Product;