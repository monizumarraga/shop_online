import React, { Component } from 'react';
import logo from './cabify-300x300.jpg';

class Register extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			email: this.props.user["email"],
			password: '',
			name: this.props.user["name"],
			new_password: '',
			address: this.props.user["address"]
		}
	}

	onNameChange = (event) =>{
		this.setState( {name: event.target.value})
	}

	onEmailChange = (event) =>{
		this.setState( {email: event.target.value})
	}

	onPasswordChange = (event) =>{
		this.setState( {password: event.target.value})
	}

	onAddressChange = (event) =>{
		this.setState( {address: event.target.value})
	}

	onNewPasswordChange = (event) =>{
		this.setState( {new_password: event.target.value})
	}

	onUpdate = (event) =>{
		fetch('http://localhost:3000/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
				name: this.state.name
			})
		})
		.then(response => response.json())
		.then(user => {
			if (user.id) {
				this.props.loadUser(user)
				this.props.onRouteChange('home')
			}else {
				alert(user)
			}
		})

	}

	render(){
	return (
		<article className='br3 ba dark-gray b--black-10 mv4 w-300 w-150-m w-70.5-l mw6 shadow-10 center'>
		<main className='pa4 black-80'>
		  <div className='measure'>
		    <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
		      <legend className='f1 fw6 ph0 mh0'>User Information</legend>
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
		        <label className='db fw6 lh-copy f6' htmlFor='email-address'>Email</label>
		        <input 
		        	onChange={this.onEmailChange}
		        	className="input-block-level" 
		        	type='email' 
		        	name='email-address' 
		        	value={this.state.email}
		        	id='email-address'
		        	/>
		      </div>
		      <div className='mv3'>
		        <label className='db fw6 lh-copy f6' htmlFor='address'>Address</label>
		        <input 
		        	onChange={this.onPasswordChange}
		        	className="input-block-level" 
		        	type='address' 
		        	name='address'  
		        	value={this.state.address}
		        	id='address'
		        	/>
		      </div>
		    </fieldset>
		    <div className=''>
		      <input 
		      		onClick={this.Update}
		      		className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib' 
		      		type='submit' 
		      		value='Update'
		      		/>
		    </div>
		    <div className='lh-copy mt3'>
		    </div>
		  </div>
		  <div className='measure'>
		    <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
		      <legend className='f1 fw6 ph0 mh0'>Password update</legend>
		      <div className='mv3'>
		        <label className='db fw6 lh-copy f6' htmlFor='password'>Previous password</label>
		        <input 
		        	onChange={this.onPasswordChange}
		        	className="input-block-level" 
		        	type='password' 
		        	name='password'  
		        	id='password'
		        	/>
		      </div>
		      <div className='mv3'>
		        <label className='db fw6 lh-copy f6' htmlFor='new_password'>New password</label>
		        <input 
		        	onChange={this.onPasswordChange}
		        	className="input-block-level" 
		        	type='new_password' 
		        	name='new_password'  
		        	id='new_password'
		        	/>
		      </div>
		    </fieldset>
		    <div className=''>
		      <input 
		      		onClick={this.onChange}
		      		className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib' 
		      		type='submit' 
		      		value='Change'
		      		/>
		    </div>
		    <div className='lh-copy mt3'>
		    </div>
		  </div>
		</main>
		</article>
		);
	}
}

export default Register;