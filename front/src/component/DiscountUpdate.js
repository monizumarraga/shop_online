import React from 'react';

class DiscountUpdate extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			name:this.props.discount["name"],
			typeUnits:'Minimum quantity',
			units:'',
			typeDiscount:'Percentage',
			discount:''
		}
		this.props.onDiscountList()
	}

	componentDidMount= () =>{
		if (this.props.discount["min_quantity"]){
			this.setState({typeUnits:'Minimum quantity'})
			this.setState({Units:this.props.discount["min_quantity"]})
		}
		if (this.props.discount["round_unit"]){
			this.setState({typeUnits:'Round units'})
			this.setState({Units:this.props.discount["round_unit"]})
		}
		if (this.props.discount["percentage"]){
			this.setState({typeDiscount:'Percentage'})
			this.setState({discount:this.props.discount["percentage"]})
		}
		if (this.props.discount["newprice"]){
			this.setState({typeDiscount:'New Price'})
			this.setState({discount:this.props.discount["newprice"]})
		}
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

  	onButtonUpdate =() =>{ 
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
	    fetch('http://localhost:3000/discountupdate', {
	    	method: 'put',
	    	credentials: 'include',
            headers: {'Content-Type': 'application/json',
			        'Accept': 'application/json',
			    	'Access-Control-Allow-Origin': '*'	,
			    	'Access-Control-Allow-Credentials': 'true'
			    	},
	    	body: JSON.stringify({
	            min_quantity: min_quantity,
				round_unit: round_unit,
				percentage: percentage,
				newprice: newprice
		      })
		    })
			.then(response => response.json())
		    .then(prodfinal => {
				this.props.onMenuChange('Update_discounts')
				this.props.onDiscountChange()
		    })
	  }

	 onButtonDelete = () => {
	    fetch('http://localhost:3000/discountdelete', {
	    	method: 'delete',
	    	credentials: 'include',
            headers: {'Content-Type': 'application/json',
			        'Accept': 'application/json',
			    	'Access-Control-Allow-Origin': '*'	,
			    	'Access-Control-Allow-Credentials': 'true'
			    	},
	    	body: JSON.stringify({
	            name: this.props.prod["name"]
		      })
		    })
			.then(response => response.json())
		    .then(prodfinal => {
				this.props.onMenuChange('Update_discounts')
				this.props.onDiscountList()
		    })
	 }

	render(){
	return (
		<div 
			className="tc dib br3 pa3 ma2 grow bw2 shadow-5"
		style= {{width:'200px'}}>
			<div>
				<div style={{border:'1px solid grey', borderRadius:'10px', padding: '1px', margin: '3px', backgroundColor: 'rgba(235, 242, 249, 1)'}}>
				<h1>{this.state.name}</h1>
				</div>
				<div className='center'
					style={{display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection: 'column'}}>
					<div className='center' style={{width: '150px', justifyContent: 'space-between'}}>
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
					<div className='center' style={{width: '150px', justifyContent: 'space-between'}}>
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
					<div className='center' style={{width: '150px', justifyContent: 'space-between'}}>
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
					<div className='center' style={{width: '150px', justifyContent: 'space-between'}}>
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

export default DiscountUpdate;