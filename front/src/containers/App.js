import React, { Component } from 'react';
import './App.css';
import Navigation from '../component/Navigation';
import Menu from '../component/Menu';
import ProductList from '../component/ProductList';
import Product from '../component/Product';
import CartList from '../component/CartList';
import Scroll from '../component/Scroll';
import SignIn from '../component/SignIn';
import Register from '../component/Register';

const initialState= {
  option:'shop',
  route: 'signin',
  isSignedIn:false,
  user: {
    id: '',
    name: '',
    password: '',
    email: '',
    cart: '',
    money: '',
    joined: ''
  },
  productList: {
    }
}
class App extends Component {
  constructor (){
    super();
    this.state={
      option:'shop',
      route: 'signin',
      isSignedIn:false,
      user: {
        id: '',
        name: '',
        password: '',
        email: '',
        cart: '',
        money: '',
        joined: ''
      },
      productList: {
        }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      password: data.password,
      email: data.email,
      cart: data.cart,
      money: data.money,
      joined: data.joined
    }})
  }

  componentDidMount(){
    fetch('http://localhost:3000/products', {
      method: 'get',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify()
    })
    .then(response => response.json())
    .then(dbProducts => {
      if (dbProducts) {
        this.setState({productList: dbProducts})
      } else {
        alert(dbProducts)
      }
    })
  }

  onRouteChange= (route) => {
    if (route === 'signout'){
      this.setState(initialState)
      this.setState({option: 'shop'})
    }else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
    this.componentDidMount()
  }

  onMenuChange= (option) => {
    this.setState({option: option})
    this.componentDidMount()
  }

  render() {
    return (
      <div className="App">
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        { this.state.route === 'home'
          ? (
            <div>
              <Menu onMenuChange={this.onMenuChange}/>
              {this.state.option === 'shop'
              ? 
                    <Scroll >
                      <ProductList productList={this.state.productList}/>
                    </ Scroll>
              :
                (this.state.option === 'cart'
                ?
                  <Scroll >
                    <CartList cartList={this.state.user["cart"]}/>
                  </ Scroll>
                :
                  <Scroll >
                    <CartList />
                  </ Scroll>
                )
              }
            </div>
            )
          :(
            this.state.route === 'signin'
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;
