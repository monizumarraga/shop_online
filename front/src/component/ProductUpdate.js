import React from 'react';

class ProductUpdate extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			units:'',
			number: '',
			price: '',
			discount: '',
			image:''
		}
	}
	componentDidMount= () =>{
		this.setState({units:this.props.prod["units"]})
		this.setState({price:this.props.prod["price"]})
		this.setState({discount:this.props.prod["discount"]})
		try {
			const img= require(`./${this.props.prod["code"]}.jpg`)
			this.setState( {image: img})
		    // do stuff
		} catch (ex) {
			const img= require(`./not_found.jpg`)
		    this.setState( {image: img})
		}
	}

	onNumberChange = (event) =>{
    	this.setState( {number: event.target.value})
    }

	onDiscountChange = (event) =>{
	    this.setState( {discount: event.target.value})
  	}

	onPriceChange = (event) =>{
	    this.setState( {price: event.target.value})
  	}

  	onButtonUpdate =() =>{ 
  		let numb = Math.floor(this.state.number)
  		let price = this.state.price
  		let discount = this.state.discount
	    if(this.state.price){  
	   
	    fetch('http://localhost:3000/productupdate', {
	    	method: 'put',
	    	credentials: 'include',
            headers: {'Content-Type': 'application/json',
			        'Accept': 'application/json',
			    	'Access-Control-Allow-Origin': '*'	,
			    	'Access-Control-Allow-Credentials': 'true'
			    	},
	    	body: JSON.stringify({
	            code: this.props.prod["code"],
	            units: numb,
	            price: price,
	            discount:discount
		      })
		    })
			.then(response => response.json())
		    .then(prodfinal => {
				this.props.onMenuChange('Update_products')
		    	let tot_units =Math.floor(this.state.units) + numb
	        	this.setState( {units: tot_units})
				this.setState( {number: ''})
		    })
	    }
	  }

	 onButtonDelete = () => {
	    fetch('http://localhost:3000/productdelete', {
	    	method: 'delete',
	    	credentials: 'include',
            headers: {'Content-Type': 'application/json',
			        'Accept': 'application/json',
			    	'Access-Control-Allow-Origin': '*'	,
			    	'Access-Control-Allow-Credentials': 'true'
			    	},
	    	body: JSON.stringify({
	            code: this.props.prod["code"]
		      })
		    })
			.then(response => response.json())
		    .then(prodfinal => {
				this.props.onMenuChange('Update_products')
		    })
	 }

	render(){
	return (
		<div 
			className="tc dib br3 pa3 ma2 grow bw2 shadow-5"
		style= {{width:'200px'}}>
			<img style= {{margin:'10px', padding: '10px', backgroundColor:'white'}} 
				src={this.state.image}
				alt={'this.props.prod["code"]'} 
				width='auto' height='120px'/> 
			<div>
				<div style={{border:'1px solid grey', borderRadius:'10px', padding: '1px', margin: '3px', backgroundColor: 'rgba(235, 242, 249, 1)'}}>
				<h1>{this.props.prod["code"]}</h1>
					<h2>{this.props.prod["name"]}</h2>
					<h2>{this.state.units} units</h2>
				</div>
				<div className='center'
					style={{display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection: 'column'}}>
					<div className='center' style={{width: '150px', justifyContent: 'space-between'}}>
					<label className='db fw6 lh-copy f6' htmlFor='price'>Price (€)</label>
					<input 
						style ={{width:'90px', height:'25px'}}
						className="center f7" 
						type="tex" 	
						name="price"
						value={this.state.price}					
						onChange={this.onPriceChange}
						/>				
					</div>
					<div className='center' style={{width: '150px', justifyContent: 'space-between'}}>
					<label className='db fw6 lh-copy f6' htmlFor='number'>Units</label>
			        <input 
						style ={{width:'90px', height:'25px'}}
						className="center f7" 
						type="tex" 	
						name="number"
						value={this.state.number}					
						onChange={this.onNumberChange}
						/>				
					</div>
					<div className='center' style={{width: '150px', justifyContent: 'space-between'}}>	
					<label className='db fw6 lh-copy f6' htmlFor='discount'>Discount</label>
					<select        
	                    value={this.state.discount}   
	                    onChange={this.onDiscountChange}
	                    className="input-block-level" 
	                    name="discount">
	                    {this.props.discountListName
	                    	?(
	                    	(this.props.discountListName).map((discount,i)=>{
	                    		return <option key={this.props.discountListName[i] + i.toString}>{this.props.discountListName[i]}</option>
	                    	})
	                    	)
                          	:(
		                    	<option value=""></option>
		                    )
                        }
	                  </select>	
					</div>
				</div>
					<button 
		      			onClick={() => this.onButtonUpdate()}
						style ={{width:'100px', height:'25px'}}
						className="f7 grow link dib grey bg-light-grey"
						>Update</button>
					<button 
		      			onClick={() => this.onButtonDelete()}
						style ={{width:'100px', height:'25px'}}
						className="f7 grow link dib grey bg-light-grey"
						>Delete</button>
			</div>
		</div>
	);
	}
}

export default ProductUpdate;