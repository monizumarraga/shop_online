import React from 'react';

class Product extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			number: 0,
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
	    if(this.state.id && this.state.code && this.state.number){  
	    fetch('localhost:3000/cartupdate', {
	    	method: 'put',
	    	headers: {'Content-Type': 'application/json'},
	    	body: JSON.stringify({
	        	id: this.state.id,
	            code: this.state.code,
	            number: this.state.number
		      })
		    })
		    .then(response => response.json())
		    .then(count => {
		    	alert(count)
		      this.setState({ number: 0})
		    })
		    

	        fetch(`http://localhost:3000/profile/${this.state.id}`, {
	        method: 'get',
	            headers: {'Content-Type': 'application/json'},
	            body: JSON.stringify()
		      })
		      .then(response => response.json())
		      .then(user => {
		        if(user.id) {
		        	alert("producto")
		        	alert(user)
		        	this.props.loadUser(user);
		        	this.setState( {units: this.props.user["cart"][this.props.prod["code"]]})
		        }
		      })
	    }
	  }

	render(){
	return (
		<div 
			style={{border:'3px solid grey'}}
			className="tc dib br3 pa3 ma2 grow bw2 shadow-5"
		style= {{width:'200px'}}>
			<img style= {{paddingTop: '20px'}} 
				src={require(`./${this.props.prod["code"]}.jpg`)}
				alt={this.props.prod["name"]} width='auto' height='120px'/> 
			<div>
				<h3>{this.props.prod["code"]}</h3>
				<div style={{display: 'flex', justifyContent: 'space-around', alignItems:'flex-end'}}>
					<h2>{this.props.prod["name"]}</h2>
					<h2>{this.props.prod["price"]}€</h2>
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
					?<h3></h3>
					:<h3>discount({this.props.prod["discount"]})</h3>
					}
			</div>
		</div>
	);
	}
}

export default Product;