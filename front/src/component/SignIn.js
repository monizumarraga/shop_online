import React, { Component } from 'react';
import logo from './cabify-300x300.jpg';


class SignIn extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: '',
			max_attempts: 0,
			password_correct: false,
		}
	}

	onEmailChange = (event) =>{
		this.setState( {signInEmail: event.target.value})
	}

	onPasswordChange = (event) =>{
		this.setState( {signInPassword: event.target.value})
	}

	onCountChange = (event) =>{
		this.setState( {max_attempts: event})
	}

	onValidChange = (event) =>{
		this.setState( {password_correct: event})
	}

	onSubmitSignin = (event) =>{
		console.log("sign in")
			fetch('http://localhost:3000/signin', {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					email: this.state.signInEmail,
					password: this.state.signInPassword
				})
			})
			.then(response => response.json())
			.then(user => {
				if (user.id) {
					this.props.loadUser(user);
					this.props.onRouteChange('home');
					this.setState({password_correct: this.onValidChange(true)});
				} else {
					let numb_tries = this.state.max_attempts+1
					this.setState({max_attempts: this.onCountChange(numb_tries)});
					alert("credential don´t match")
					if (this.state.max_attempts === 3){
						alert("number of attempts exceed")
						this.props.onRouteChange('signout');
					}
				}
			})
	}

	render() {
	const { onRouteChange } = this.props;
	return (
		<article className='br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
		<main className='pa4 black-80'>
			<img style= {{paddingTop: '20px'}} src={logo} alt="logo" width='auto' heigth='150px' /> 
		  <div className='measure'>
		    <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
		      <legend className='f1 fw6 ph0 mh0'>Sign In</legend>
		      <div className='mt3'>
		        <label className='db fw6 lh-copy f6' htmlFor="email-address">Email</label>
		        <input 
		        	onChange={this.onEmailChange}
		        	className="input-block-level"
		        	type='email' 
		        	name='email-address'  
		        	id='email-address'
		        	/>
		      </div>
		      <div className='mv3'>
		        <label className='db fw6 lh-copy f6' htmlFor='password'>Password</label>
		        <input 
		        	onChange={this.onPasswordChange}
		        	className="input-block-level"
		        	type='password' 
		        	name='password'  
		        	id='password'
		        	/>
		      </div>
		    </fieldset>
		    <div className=''>
		      <input 
		      		onClick={this.onSubmitSignin}
		      		className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib' 
		      		type='submit' 
		      		value='Sign In'
		      		/>
		    </div>
		    <div className='lh-copy mt3'>
		      <p 
		      		onClick={() => onRouteChange('register')}
		      		className='f6 link dim black db pointer' >Register</p>
		    </div>
		  </div>
		</main>
		</article>
		);
	}
}

export default SignIn;
