
  onCartUpdate =()=>{
    alert("aqui")
    let obj=Object.keys(this.state.user["cart"]).map((prod,i)=>{
      alert(prod)
      alert(this.state.user["units"])
      let price= this.onProdChange(prod, this.state.user["units"])
      alert(price)
      return obj[this.state.user["units"]]=price
    })
  }

  onProdChange = (prod, number) => {
    fetch(`http://localhost:3000/productprice/${prod}/${number}`, {
      method: 'get',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify()
    })
    .then(response => response.json())
    .then(price => {
      if (price) {
        alert(price)
        return price
      } else {
        alert(price)
      }
    })
  }



  onNumberChange = (event) =>{
    this.setState( {number: event.target.value})
  }

  onButtonBuy =() =>{ 
    
  

alert(this.state.id)
    alert(this.state.code)
    alert(this.state.number)
    if(this.state.id && this.state.code && this.state.number){  
      alert("enrta")
      this.setState({id: this.props.user["id"]})
      this.setState({code: this.props.prod["code"]})
        fetch('localhost:3000/cartupdate', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.id,
            code: this.state.code,
            number: this.state.number
          })
        })
        .then(response => {
          alert(response)
          this.setState({number: response})
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
          alert(user.cart)
        this.props.loadUser(user);
        }
      })
    }
    }