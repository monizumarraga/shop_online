import React from 'react';


const Pay = ({onMenuChange}) => {

	return (
		<div className='br3 ba dark-gray b--black-10 mv4 w-200 w-100-m w-50-l mw6 shadow-10 center'>

  <div >
      <form class="form-horizontal span6">
        <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
       		<legend className='f1 fw6 ph0 mh0'>Credit Card Payment</legend>
		    <div className='mt3'>
            <label className='db fw6 lh-copy f6'>Card Holder's Name</label>
            <div class="controls">
              <input type="text" className="input-block-level" pattern="\w+ \w+.*" title="First and last name" required=""/>
            </div>
          </div>
       
          <div className='mt3'>
            <label className='db fw6 lh-copy f6'>Card Number</label>
            <div class="controls">
              <div class="center">
                  	<input type="text" className="input-block-level" autocomplete="off" maxlength="4" pattern="\d{4}" title="First 4 digits" required=""/>
                  	<input type="text" className="input-block-level" autocomplete="off" maxlength="4" pattern="\d{4}" title="Second 4 digits" required=""/>
	              	<input type="text" className="input-block-level" autocomplete="off" maxlength="4" pattern="\d{4}" title="Third 4 digits" required=""/>
                	<input type="text" className="input-block-level" autocomplete="off" maxlength="4" pattern="\d{4}" title="Fourth 4 digits" required=""/>
              </div>
            </div>
          </div>
       
          <div className='mt3'>
            <label className='db fw6 lh-copy f6'>Card Expiry Date</label>
            <div class="controls">
              <div class="row-fluid">
                <div class="span9">
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
                <div class="span3">
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
            <div class="controls">
              <div class="row-fluid">
                <div class="span3">
                  <input type="text" className="input-block-level" autocomplete="off" maxlength="3" pattern="\d{3}" title="Three digits on back of card" required=""/>
                </div>
                <div class="span8">                 
                </div>
              </div>
            </div>
          </div>
          <div className='mt3'>
            <button type="submit" class="btn btn-primary">Submit</button>
            <button 
      			onClick={() => onMenuChange('cart')}
      			type="button" class="btn"
      			>Cancel</button>
          </div>
        </fieldset>
      </form>
    </div>
</div>
	);
}

export default Pay;