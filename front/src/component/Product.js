import React from 'react';

class Product extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			number: '',
			id: '',
			code: '',
			units:this.props.userCart[this.props.prod["code"]]
		}
	}

	onNumberChange = (event) =>{
    	this.setState( {number: event.target.value})
	    this.setState( {id: this.props.user["id"]})
	    this.setState( {code: this.props.prod["code"]})
	    this.setState( {units: this.props.userCart[this.props.prod["code"]]})
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
			    	'Access-Control-Allow-Credentials': 'true'
			    	},
	    	body: JSON.stringify({
	        	id: this.state.id,
	            code: this.state.code,
	            number: numb,
	            update:false
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

	        
	    }
	  }

	render(){
	return (
		<div 
			className="tc dib br3 pa3 ma2 grow bw2 shadow-5"
		style= {{width:'200px'}}>
			<img style= {{margin:'10px', padding: '10px', backgroundColor:'white'}} 
				src={require(`./${this.props.prod["code"]}.jpg`)}
				alt={this.props.prod["name"]} width='auto' height='120px'/> 
			<div>
				<div style={{border:'1px solid grey', borderRadius:'10px', padding: '1px', margin: '3px', backgroundColor: 'rgba(235, 242, 249, 1)'}}>
				<h1>{this.props.prod["code"]}</h1>
				<div style={{display: 'flex', justifyContent: 'space-around', alignItems:'flex-end'}}>
					<h2>{this.props.prod["name"]}</h2>
					<h2>{this.props.prod["price"]}€</h2>
				</div>
				</div>
				<div className='center'
					style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
					{this.props.userCart[this.props.prod["code"]]
					?<h2>{this.state.units} units</h2>
					:<h2>0 units</h2>
					}					
					<input 
						style ={{width:'50px', height:'25px'}}
						className="center f7" 
						type="tex" 	
						value={this.state.number}					
						onChange={this.onNumberChange}
						/>
					<button 
		      			onClick={() => this.onButtonBuy()}
						style ={{width:'50px', height:'25px'}}
						className="f7 grow link dib grey bg-light-grey"
						>Buy</button>
				</div>
					<h3>availability: {this.props.prod["units"]}units</h3>
					{this.props.prod["discount"]===""
					?<h3>(No discount)</h3>
					:<h3>discount({this.props.prod["discount"]})</h3>
					}
			</div>
		</div>
	);
	}
}

export default Product;