import React from 'react';

class Cart extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			number: '',
			id: '',
			code: this.props.prod,
			units:this.props.units,
			total:''
		}
		this.onPriceChange()
	}

	onNumberChange = (event) =>{
    	this.setState( {number: event.target.value})
	    this.setState( {id: this.props.user["id"]})
	    this.setState( {code: this.props.prod})
	    this.setState( {units: this.props.units})
	    this.onPriceChange()
  	}

	onPriceChange= () =>{
  		let numb=0
  		if (this.state.number){
  			numb = Math.floor(this.state.number)
  		}else{
  			numb=this.props.units
  		}
	    if(this.state.code && numb){
	    fetch(`http://localhost:3000/productprice/${this.state.code}/${numb}`, {
	      method: 'get',
	      headers: {'Content-Type': 'application/json'},
	      body: JSON.stringify()
	    })
	    .then(response => response.json())
	    .then(price => {
	      if (price) {
	        this.setState({total: price})
	      } 
	    })
		}
	}


  	onButtonBuy =() =>{ 
  		let numb = Math.floor(this.state.number)
	    if(this.state.id && this.state.code && this.state.number){  
	   	    fetch('http://localhost:3000/cartupdate', {
	    	method: 'put',
	    	credentials: 'include',
            headers: {'Content-Type': 'application/json',
			        'Accept': 'application/json',
			    	'Access-Control-Allow-Origin': '*'	,
			    	'Access-Control-Allow-Credentials': 'true',
			    	'Content-Type': 'application/json' 
			    	},
	    	body: JSON.stringify({
	        	id: this.state.id,
	            code: this.state.code,
	            number: numb,
	            update:true
		      })
		    })
			.then(response => response.json())
		    .then(count => {
		    	fetch(`http://localhost:3000/profile/${this.state.id}`, {
			        method: 'get',
			            headers: {'Content-Type': 'application/json'},
			            body: JSON.stringify()
				      })
				      .then(response => response.json())
				      .then(user => {
				        if(user.id) {
				        	this.props.loadUser(user);
    						this.setState( {number: ''})
    						
				        	this.setState( {units: this.props.user["cart"][this.props.prod["code"]]})
				        }
				      })
		      this.setState({ number: 0})
		    })
		    this.onPriceChange()
	    }
	}

	render(){
	return (
		<div 
			className="tc dib br3 pa3 ma2 grow bw2 shadow-5"
			style= {{width:'100%'}}>
			<div className="center" style={{justifyContent: 'space-around', alignItems:'flex-end'}}>
				<div className="center" style={{justifyContent: 'space-between', alignItems:'flex-end', width:'40%'}}>
					<div style={{display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection: 'column'}}>
						<h5>{this.props.prodDesc}</h5>
						<h5>{this.props.prod}</h5>
					</div>
					<div className="center" style={{justifyContent: 'space-between', alignItems:'flex-end', width:'60%'}}>
						<h3 style={{alignSelf: "flex-start"}}>{this.props.units}units</h3>
						<h3 style={{alignSelf: "flex-end"}}>{this.state.total} €</h3>
					</div>
				</div>
				<div className="center" style={{justifyContent: 'space-between', alignItems:'flex-end', width:'50%'}}>
					<div style={{display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection: 'column'}}>
						<h4>price: {this.props.prodPrice} €</h4>
						<h4>available units: {this.props.prodUnits}</h4>
					</div>
					{this.props.discPrice===""
					?<h3></h3>
					:<h4>discount({this.props.discPrice})</h4>
					}
					<div className='center'
						style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
					<input 
						style ={{width:'40px', height:'25px'}}
						className="center f7" 
						type="tex" 
						value={this.state.number}					
						onChange={this.onNumberChange}
						/>
					<button 
		      			onClick={() => this.onButtonBuy()}
						style ={{width:'60px', height:'25px'}}
						className="f7 grow link dib grey bg-light-grey"
						>Update</button>
				</div>
				</div>

			</div>
		</div>
	);
	}
}

export default Cart;