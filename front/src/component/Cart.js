import React from 'react';

class Cart extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			number: '',
			id: '',
			code: '',
			units:'',
			total:''
		}
		this.onPriceChange()
	}

	componentDidMount= () =>{
		this.setState({code: this.props.prod})
		this.setState({units: this.props.units})
		this.props.onCartPrice(this.props.prod, this.state.total)
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
  		let code= this.props.prod
  		if (this.state.number){
  			numb = Math.floor(this.state.number)
  		}else{
  			numb=this.props.units
  		}
	    if(code && numb){
	    fetch(`http://localhost:3000/productprice/${code}/${numb}`, {
	      method: 'get',
	      headers: {'Content-Type': 'application/json'},
	      body: JSON.stringify()
	    })
	    .then(response => response.json())
	    .then(price => {
	      if (price) {
	        this.setState({total: price})
	        this.props.onCartPrice(this.props.prod, price)
	      } 
	    })
		}
	}


  	onButtonUpdate =() =>{ 
  		let code= this.state.code
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
				        	if (numb===0){
	        				this.props.onCartPrice(code, numb)
				        	}else{
	        				this.props.onCartPrice(code, this.state.total)
	        				}
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
				<div className="center" style={{justifyContent: 'space-between', alignItems:'flex-end', width:'40%', border:'1px solid grey', borderRadius:'10px', padding: '1px', margin: '3px', backgroundColor: 'rgba(235, 242, 249, 1)'}}>
					<div style={{display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection: 'column', margin:'5px'}}>
						<h5>{this.props.prodDesc}</h5>
						<h5>{this.props.prod}</h5>
					</div>
					<div className="center" style={{justifyContent: 'space-between', alignItems:'center', width:'60%', margin:'10px'}}>
						<h3 style={{alignSelf: "flex-start"}}>{this.props.units}units</h3>
						<h3 style={{alignSelf: "flex-end"}}>{this.state.total} €</h3>
					</div>
				</div>
				<div className="center" style={{justifyContent: 'space-between', alignItems:'flex-end', width:'50%'}}>
					<div style={{display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection: 'column'}}>
						<h3>price: {this.props.prodPrice} €</h3>
						<h3>available units: {this.props.prodUnits}</h3>
					</div>
					{this.props.discPrice===""
					?<h3>(No discount)</h3>
					:<h3>discount({this.props.discPrice})</h3>
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
		      			onClick={() => this.onButtonUpdate()}
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