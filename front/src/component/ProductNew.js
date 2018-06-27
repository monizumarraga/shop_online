import React from 'react';

class ProductNew extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			code: '',
			name:'',
			price:'',
			units:'',
			discount:''
		}
		this.props.onDiscountList()
	}

	onCodeChange = (event) =>{
    	this.setState( {code: event.target.value})
  	}

	onNameChange = (event) =>{
    	this.setState( {name: event.target.value})
  	}
	onPriceChange = (event) =>{
    	this.setState( {price: event.target.value})
  	}
	onUnitsChange = (event) =>{
    	this.setState( {units: event.target.value})
  	}
	onDiscountChange = (event) =>{
    	this.setState( {discount: event.target.value})
  	}

  	onCreate =() =>{ 	  
	    fetch('http://localhost:3000/productnew', {
	    	method: 'post',
	    	credentials: 'include',
            headers: {'Content-Type': 'application/json',
			        'Accept': 'application/json',
			    	'Access-Control-Allow-Origin': '*'	,
			    	'Access-Control-Allow-Credentials': 'true'
			    	},
	    	body: JSON.stringify({
	            code: this.state.code,
	        	name: this.state.name,
	            price: this.state.price,
	            units: this.state.units,
	        	discount: this.state.discount
		      })
		    })
			.then(response => response.json())
		    .then(count => {
		    	alert("product created")
		  		this.setState({code:''})   
		  		this.setState({name:''})   
		  		this.setState({price:''})   
		  		this.setState({units:''})   
		  		this.setState({discount:''})  
		    	this.props.onProductChange()
		    	this.props.onMenuChange('New_product')
		    })
	  }

	render(){
	return (
		<article className='br3 ba dark-gray b--black-10 mv4 w-300 w-150-m w-70.5-l mw6 shadow-10 center'>
		<div className='pa4 black-80'>
		  <div className='measure'>
		    <fieldset id='sign_up' className='ba b--transparent ph0 mh0'
				style={{backgroundColor:'rgba(203, 221, 240, 1)'}}>
		      <legend className='f1 fw6 ph0 mh0'>New product</legend>
			  <div className='mt3'>
		        <label className='db fw6 lh-copy f6' htmlFor='code'>Code</label>
		        <input 
		        	onChange={this.onCodeChange}
		        	className="input-block-level" 
		        	type='text' 
		        	name='code'  
		        	value={this.state.code}
		        	id='code'
		        	/>
		      </div>
			  <div className='mt3'>
		        <label className='db fw6 lh-copy f6' htmlFor='name'>Name</label>
		        <input 
		        	onChange={this.onNameChange}
		        	className="input-block-level" 
		        	type='text' 
		        	name='name'  
		        	value={this.state.name}
		        	id='name'
		        	/>
		      </div>
		      <div className='mt3'>
		        <label className='db fw6 lh-copy f6' htmlFor='price'>Price (€)</label>
		        <input 
		        	onChange={this.onPriceChange}
		        	className="input-block-level" 
		        	type='text' 
		        	name='price'  
		        	value={this.state.price}
		        	id='price'
		        	/>
		      </div>
		      <div className='mt3'>
		        <label className='db fw6 lh-copy f6' htmlFor='units'>Units</label>
		        <input 
		        	onChange={this.onUnitsChange}
		        	className="input-block-level" 
		        	type='text' 
		        	name='unnits'  
		        	value={this.state.units}
		        	id='unnits'
		        	/>
		      </div>
		      <div className='mt3'>
		        <label className='db fw6 lh-copy f6' htmlFor='discount'>Discount</label>	
					<select        
	                    value={this.state.discount}   
	                    onChange={this.onDiscountChange}
	                    className="input-block-level" 
	                    name="discount">
	                    {this.props.discountListName
	                    	?(
	                    	Object.keys(this.props.discountListName).map((discount,i)=>{
	                    		return <option key={i}>{this.props.discountListName[i]}</option>
	                    	})
	                    	)
                          	:(
		                    	<option value=""></option>
		                    )
                        }
	                  </select>	
		      </div>
		      </fieldset>
				<div>
					<button 
		      			onClick={() => this.onCreate()}
						style ={{width:'50px', height:'25px', margin:'5px'}}
						className="f7 grow link dib grey bg-light-grey"
						>New</button>
				</div>
		</div>
		</div>
		</article>
	);
	}
}

export default ProductNew;