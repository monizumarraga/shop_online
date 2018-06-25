import React from 'react';


const Pay = ({onMenuChange}) => {

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
              <input type="text" className="input-block-level" pattern="\w+ \w+.*" title="First and last name" required=""/>
            </div>
          </div>
       
          <div className='mt3'>
            <label className='db fw6 lh-copy f6'>Card Number</label>
            <div className="controls">
              <div className="center">
                  	<input type="text" className="input-block-level" autoComplete="off" maxLength="4" pattern="\d{4}" title="First 4 digits" required=""/>
                  	<input type="text" className="input-block-level" autoComplete="off" maxLength="4" pattern="\d{4}" title="Second 4 digits" required=""/>
	              	<input type="text" className="input-block-level" autoComplete="off" maxLength="4" pattern="\d{4}" title="Third 4 digits" required=""/>
                	<input type="text" className="input-block-level" autoComplete="off" maxLength="4" pattern="\d{4}" title="Fourth 4 digits" required=""/>
              </div>
            </div>
          </div>
       
          <div className='mt3'>
            <label className='db fw6 lh-copy f6'>Card Expiry Date</label>
            <div className="controls">
              <div className="row-fluid">
                <div className="span9">
                  <select className="input-block-level" name="cc_exp_mo">
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
                  <select className="input-block-level" name="cc_exp_yr">
                    <option>2018</option>
                    <option>2019</option>
                    <option>2020</option>
                    <option>2021</option>
                    <option>2022</option>
                    <option>2024</option>
                    <option>2025</option>
                    <option>2026</option>
                    <option>2027</option>
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
                  <input type="text" className="input-block-level" autoComplete="off" maxLength="3" pattern="\d{3}" title="Three digits on back of card" required=""/>
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
            className="btn btn-primary"
              style={{margin:'5px'}}>Submit</button>
            <button 
      			onClick={() => onMenuChange('cart')}
      			type="button" className="btn"
      			>Cancel</button>
          </div>
        
      
    </div>
</div>
	);
}

export default Pay;