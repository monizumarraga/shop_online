import React, { Component } from 'react';
import './App.css';
import Navigation from '../component/Navigation';
import Menu from '../component/Menu';
import ProductList from '../component/ProductList';
import CartList from '../component/CartList';
import Scroll from '../component/Scroll';
import SignIn from '../component/SignIn';
import Register from '../component/Register';
import Pay from '../component/Pay';
import User from '../component/User';
import ProductNew from '../component/ProductNew'
import DiscountNew from '../component/DiscountNew'
import DiscountList from '../component/DiscountList'

const initialState= {
  option:'shop',
  route: 'signin',
  isSignedIn:false,
  user: {
    id: '',
    name: '',
    password: '',
    email: '',
    cart: {},
    address: '',
    joined: ''
  },
  productList: {
    },
  price: 0,
  discountList: {
      },
  discountListName: {
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
        cart: {},
        address: '',
        joined: ''
      },
      productList: {
        },
    price: 0,
    discountList: {
        }
    }
  }

  loadUser = (data) => {
    let cartInfo={}
    if(data.cart){
      cartInfo= JSON.parse(data.cart.replace(/[\\]/g,''))
      }
    this.setState({user: {
      id: data.id,
      name: data.name,
      password: data.password,
      email: data.email,
      cart: cartInfo,
      address: data.address,
      joined: data.joined
    }})
    this.onPriceChange()
  }

  componentDidMount= () =>{
    this.onProductChange()
    this.onDiscountList()
    }

  onDiscountList =()=> {
    let list
      fetch('http://localhost:3000/discounts', {
        method: 'get',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify()
      })
      .then(response => response.json())
      .then(dbDiscounts => {
        if (dbDiscounts) {
          this.setState({discountList: dbDiscounts})
          list=dbDiscounts.map((discount,i)=>{
            return dbDiscounts[i]["name"]
          })
          list.push({})
          this.setState({discountListName: list})
        } else {
          alert(dbDiscounts)
        }
      })    
  }

  onProductChange = () =>{
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
    this.onDiscountList()
  }

  onMenuChange= (option) => {
    this.setState({option: option})
    this.componentDidMount()
    this.onPriceChange()
    this.onDiscountList()
  }

  onPriceChange= () => {
    fetch(`http://localhost:3000/totalprice/${this.state.user["id"]}`, {
      method: 'get',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify()
    })
    .then(response => response.json())
    .then(price => {
      if (price) {
        this.setState({price: price})
      } 
    })
  }

  onDeleteCart = () => {
    fetch(`http://localhost:3000/cartdelete`, {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: this.state.user["id"]
      })
    })
    .then(response => response.json())
    .then(user => {
        this.loadUser(user)
        this.onMenuChange('shop')
    })
  }

  onProfileGet = ()  => {
    fetch(`http://localhost:3000/profile/${this.state.user["id"]}`, {
      method: 'get',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify()
      })
      .then(response => response.json())
      .then(user => {
        if(user["id"]) {
          this.loadUser(user);
        }
      })
  }

  onPay =(name, digits1, digits2, digits3, digits4, month, year, psw) =>{
  if (name && 
    digits1.length===4 && parseInt(digits1, 10) &&
    digits2.length===4 && parseInt(digits2, 10) &&
    digits3.length===4 && parseInt(digits3, 10) &&
    digits4.length===4 && parseInt(digits4, 10) &&
    month && 
    year && 
    psw.length===3  && parseInt(psw, 10) ){
    fetch(`http://localhost:3000/pay`, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: this.state.user["id"],
          totalprice: this.state.price
        })
      })
      .then(response => response.json())
      .then(user => {
        alert("aqui")
          this.onProfileGet()
          this.onProductChange()
          this.onMenuChange('shop')
      })
      }
    else{
      alert("include all credit card details")
    }
  }

  render() {
    return (
      <div className="App">
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        { this.state.route === 'home'
        ? (<div>
          <Menu 
            onMenuChange={this.onMenuChange}
            user={this.state.user}/>
            {this.state.option === 'Update_products'
              ?(<div>
                    <Scroll >
                      <ProductList 
                        productList={this.state.productList} 
                        userCart=""
                        user={this.state.user}
                        loadUser={this.loadUser}
                        onMenuChange={this.onMenuChange}    
                        onProductChange={this.onProductChange}
                        discountListName={this.state.discountListName}
                        onDiscountList={this.onDiscountList}
                        />
                    </ Scroll>
                  </div>) 
              :(this.state.option === 'New_product'
              ?(<div>
                  <ProductNew
                      onMenuChange={this.onMenuChange}    
                      onProductChange={this.onProductChange}
                      discountListName={this.state.discountListName}
                      onDiscountList={this.onDiscountList}
                      />
                </div>) 
              :this.state.option === 'Update_discount'
              ? (<Scroll >
                      <DiscountList 
                        onMenuChange={this.onMenuChange}    
                        discountList={this.state.discountList}
                        onDiscountList={this.onDiscountList}
                        />
                    </ Scroll>
              )
              :(this.state.option === 'New_discount'
                ? (<div>
                    <DiscountNew
                        onMenuChange={this.onMenuChange}
                        />
                  </div>)
                : (
                  <div>
                    {this.state.option === 'shop'
                    ? 
                      <Scroll >
                        <ProductList 
                          productList={this.state.productList} 
                          userCart={this.state.user["cart"]}
                          user={this.state.user}
                          onMenuChange={this.onMenuChange}    
                          loadUser={this.loadUser}
                          onMenuChange={this.onMenuChange}    
                          onProductChange={this.onProductChange}
                          discountListName={this.state.discountListName}
                        onDiscountList={this.onDiscountList}
                          />
                      </ Scroll>
                    :
                      (this.state.option === 'cart'
                      ?
                        <Scroll >
                          <CartList 
                            userCart={this.state.user["cart"]}
                            productList={this.state.productList} 
                            totalprice={this.state.price}
                            user={this.state.user}
                            loadUser={this.loadUser}   
                            onMenuChange={this.onMenuChange}    
                            onDeleteCart={this.onDeleteCart}             
                          />
                        </ Scroll>
                      :
                        (this.state.option === 'user'
                          ?
                            <User 
                              user={this.state.user}
                              loadUser={this.loadUser}
                              onRouteChange={this.onRouteChange} 
                              onMenuChange={this.onMenuChange}/>
                          :
                            <Scroll >
                              <Pay 
                                onMenuChange={this.onMenuChange}
                                onPay={this.onPay}/>
                            </ Scroll>
                        )
                      )
                    }
                  </div>
                )
              )
            )
          }
          </div>)
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
