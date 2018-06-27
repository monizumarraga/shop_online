import React from 'react';


class Pay extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      thisyear: new Date().getFullYear(),
      years_list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      name:'',
      digits1:'',
      digits2:'',
      digits3:'',
      digits4:'',
      month:'',
      year: '',
      psw:''
    }
  }

  onNameChange= (event) =>{
      this.setState( {name: event.target.value})
  }

  onYearChange= (event) =>{
      this.setState( {year: event.target.value})
  }

  onDigits1Change= (event) =>{
      this.setState( {digits1: event.target.value})
  }

  onDigits2Change= (event) =>{
      this.setState( {digits2: event.target.value})
  }

  onDigits3Change= (event) =>{
      this.setState( {digits3: event.target.value})
  }

  onDigits4Change= (event) =>{
      this.setState( {digits4: event.target.value})
  }

  onMonthChange= (event) =>{
      this.setState( {month: event.target.value})
  }

  onPswChange= (event) =>{
      this.setState( {psw: event.target.value})
  }

  render(){
	return (
		<div className='br3 ba dark-gray b--black-10 mv4 w-200 w-100-m w-50-l mw6 shadow-10 center'>

  <div >
      <form className="form-horizontal span6">
        <fieldset id='sign_up' className='ba b--transparent ph0 mh0'
      style={{backgroundColor:'rgba(203, 221, 240, 1)'}}>
       		<legend className='f1 fw6 ph0 mh0'>Credit Card Payment</legend>
		    <div className='mt3'>
            <label className='db fw6 lh-copy f6'>Card Holder's Name</label>
            <div className="controls">
              <input 
                value={this.state.name}         
                onChange={this.onNameChange}
                type="text" 
                className="input-block-level" 
                pattern="\w+ \w+.*" 
                title="First and last name" required=""/>
            </div>
          </div>
       
          <div className='mt3'>
            <label className='db fw6 lh-copy f6'>Card Number</label>
            <div className="controls">
              <div className="center">
                	<input 
                    value={this.state.digits1}         
                    onChange={this.onDigits1Change}
                    type="text" 
                    className="input-block-level" 
                    autoComplete="off" 
                    maxLength="4" 
                    pattern="\d{4}" 
                    title="First 4 digits" 
                    required=""/>
                	<input 
                    value={this.state.digits2}         
                    onChange={this.onDigits2Change}
                    type="text" 
                    className="input-block-level" 
                    autoComplete="off" 
                    maxLength="4" 
                    pattern="\d{4}" 
                    title="Second 4 digits" 
                    required=""/>
	              	<input type="text" 
                    value={this.state.digits3}         
                    onChange={this.onDigits3Change}
                    className="input-block-level" 
                    autoComplete="off" 
                    maxLength="4" 
                    pattern="\d{4}" 
                    title="Third 4 digits" 
                    required=""/>
                	<input 
                    value={this.state.digits4}         
                    onChange={this.onDigits4Change}
                    type="text" 
                    className="input-block-level" 
                    autoComplete="off" 
                    maxLength="4" 
                    pattern="\d{4}" 
                    title="Fourth 4 digits" 
                    required=""/>
              </div>
            </div>
          </div>
       
          <div className='mt3'>
            <label className='db fw6 lh-copy f6'>Card Expiry Date</label>
            <div className="controls">
              <div className="row-fluid">
                <div className="span9">
                  <select         
                    value={this.state.month}   
                    onChange={this.onMonthChange}
                    className="input-block-level" 
                    name="cc_exp_mo">
                      <option value=""></option>
                      <option value="01">January</option>
                      <option value="02">February</option>
                      <option value="03">March</option>
                      <option value="04">April</option>
                      <option value="05">May</option>
                      <option value="06">June</option>
                      <option value="07">July</option>
                      <option value="08">August</option>
                      <option value="09">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                  </select>
                </div>
                <div className="span3">
                  <select        
                    value={this.state.year}   
                    onChange={this.onYearChange}
                    className="input-block-level" 
                    name="cc_exp_yr">
                      <option value=""></option>
                    {this.state.years_list.map((num, i) => {
                      return <option 
                                key={i.toString()}> {Math.floor(this.state.thisyear) + num}</option>
                          })
                          }
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className='mt3'>
            <label className='db fw6 lh-copy f6'>Card CVV</label>
            <div className="controls">
              <div className="row-fluid">
                <div className="span3">
                  <input 
                    value={this.state.psw}         
                    onChange={this.onPswChange}
                    type="text" 
                    className="input-block-level" 
                    autoComplete="off" 
                    maxLength="3" 
                    pattern="\d{3}" 
                    title="Three digits on back of card" required=""/>
                </div>
                <div className="span8">                 
                </div>
              </div>
            </div>
          </div>
          </fieldset>
      </form> 
          <div className='mt3'>
            <button type="submit" 
            onClick={() => this.props.onPay(this.state.name, this.state.digits1, this.state.digits2, this.state.digits3, this.state.digits4, this.state.month, this.state.year, this.state.psw)}
              style={{margin:'5px'}}>Submit</button>
            <button 
      			onClick={() => this.props.onMenuChange('cart')}
      			type="button" className="btn"
      			>Cancel</button>
          </div>
        
      
    </div>
</div>
	);
}
}

export default Pay;