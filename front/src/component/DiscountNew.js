import React from 'react';

class DiscountNew extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			name:'',
			typeUnits:'Minimum quantity',
			units:'',
			typeDiscount:'Percentage',
			discount:''
		}
	}

	onNameChange = (event) =>{
    	this.setState( {name: event.target.value})
  	}

  	onTypeUnitsChange= (event) =>{
    	this.setState( {typeUnits: event.target.value})
  	}

  	onUnitsChange= (event) =>{
    	this.setState( {units: event.target.value})
  	}

  	onTypeDiscChange= (event) =>{
    	this.setState( {typeDiscount: event.target.value})
  	}

  	onDiscChange= (event) =>{
    	this.setState( {discount: event.target.value})
  	}

  	onCreate =() =>{ 	
  		let min_quantity=null
  		let round_unit=null
  		let percentage=null
  		let newprice=null
  		if(this.state.typeUnits==='Minimum quantity'){
			min_quantity= this.state.units
  		}
		else{
		  	round_unit= this.state.units
		}
  		if(this.state.typeDiscount==='Percentage'){
			percentage= this.state.discount
  		}
		else{
			newprice= this.state.discount
		}
	    fetch('http://localhost:3000/discountnew', {
	    	method: 'post',
	    	credentials: 'include',
            headers: {'Content-Type': 'application/json',
			        'Accept': 'application/json',
			    	'Access-Control-Allow-Origin': '*'	,
			    	'Access-Control-Allow-Credentials': 'true'
			    	},
	    	body: JSON.stringify({
	        	name:this.state.name,
				min_quantity: min_quantity,
				round_unit: round_unit,
				percentage: percentage,
				newprice: newprice
		      })
		    })
			.then(response => response.json())
		    .then(count => {
		    	alert(count)
		  		this.setState({name:''})    
		  		this.setState({units:''}) 
		  		this.setState({discount:''})   
		  		this.setState({min_quantity:''}) 
		  		this.setState({round_unit:''})   
		  		this.setState({percentage:''})   
		  		this.setState({newprice:''})  
		    	this.props.onDiscountList()
		    	this.props.onMenuChange('New_discount')
		    })
	  }

	render(){
	return (
		<article className='br3 ba dark-gray b--black-10 mv4 w-300 w-300-m w-70.5-l mw6 shadow-10 center'>
		<div className='pa4 black-80'>
		  <div className='measure' style={{width:'500px'}}>
		    <fieldset id='sign_up' className='ba b--transparent ph0 mh0'
				style={{backgroundColor:'rgba(203, 221, 240, 1)'}}>
		      <legend className='f1 fw6 ph0 mh0'>New discount</legend>
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
		      <div>
		      	<label className='db fw6 lh-copy f6' htmlFor='typeUnits'>Type units</label>	
					<select   
						value={this.state.typeUnits}
	                    onChange={this.onTypeUnitsChange}
	                    className="input-block-level" 
	                    name="typeUnits">
		                    <option value="Minimum quantity">Minimum quantity</option>
		                    <option value="Round units">Round units</option>
	                  </select>	
	          </div>
			  <div className='mt3'>
			  		<label className='db fw6 lh-copy f6' htmlFor='units'>{this.state.typeUnits}</label>
		        <input 
		        	onChange={this.onUnitsChange}
		        	className="input-block-level" 
		        	type='text' 
		        	name='units'  
		        	value={this.state.units}
		        	id='units'
		        	/>
		      </div>
		      <div className='mt3'>
		        <label className='db fw6 lh-copy f6' htmlFor='typeDiscount'>Type discount</label>	
				<select   
					value={this.state.typeDiscount}
                    onChange={this.onTypeDiscChange}
                    className="input-block-level" 
                    name="typeDiscount">
	                    <option value="Percentage">Percentage</option>
	                    <option value="New Price">New Price</option>
                  </select>	
              </div>
			  <div className='mt3'>
			  	<label className='db fw6 lh-copy f6' htmlFor='discount'>{this.state.typeDiscount}</label>
		        <input 
		        	onChange={this.onDiscChange}
		        	className="input-block-level" 
		        	type='text' 
		        	name='discount'  
		        	value={this.state.discount}
		        	id='discount'
		        	/>
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

export default DiscountNew;