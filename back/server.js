const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require ('./controllers/register');
const signin = require ('./controllers/signin');
const profile = require ('./controllers/profile');
const products = require ('./controllers/products');
const cartupdate = require ('./controllers/cartupdate');

var db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Monica.301184',
    database : 'shop'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=>{res.send('it is working')})

app.post('/signin', signin.handleSignin(db,bcrypt))
app.post('/register',register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfile(db))
app.get('/products', products.handleProduct(db))
app.put('/cartupdate', cartupdate.handleCartProduct(db))

const PORT = process.env.PORT
app.listen(PORT || 3000, ()=>{
	console.log(`app is running on port ${PORT}`);
})

console.log(PORT)