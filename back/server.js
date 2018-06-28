const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

const register = require ('./controllers/register');
const signin = require ('./controllers/signin');
const profile = require ('./controllers/profile');
const products = require ('./controllers/products');
const cartupdate = require ('./controllers/cartupdate');
const totalprice = require ('./controllers/totalprice');
const productprice = require ('./controllers/productprice');
const change = require ('./controllers/change');
const pay = require ('./controllers/pay');
const userdelete = require ('./controllers/userdelete');
const changepassword = require ('./controllers/changepassword');
const cartdelete = require ('./controllers/cartdelete');
const discounts = require ('./controllers/discounts');
const productupdate = require('./controllers/productupdate');
const productdelete= require('./controllers/productdelete');
const productnew= require('./controllers/productnew');
const discountnew= require('./controllers/discountnew');
const discountupdate= require('./controllers/discountupdate');
const discountdelete= require('./controllers/discountdelete');

var connection= {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Monica.301184',
    database : 'shop'
  }

var db = require('knex')({
  client: 'pg',
  connection: connection
});

app.use(bodyParser.json());
app.use(cors());
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
   res.header("Access-Control-Allow-Origin", "http://localhost:3006");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

app.get('/', (req, res)=>{res.send('it is working')})

app.post('/register',register.handleRegister(db, bcrypt))
app.post('/signin', signin.handleSignin(db,bcrypt))
app.get('/profile/:id', profile.handleProfile(db))
app.get('/products', products.handleProduct(db))
app.put('/cartupdate', cartupdate.handleCartProduct(db))
app.get('/totalprice/:id', totalprice.handleTotalprice(db))
app.get('/productprice/:code/:number',productprice.handleProductprice(db))
app.put('/change/:id', change.handleChange(db))
app.put('/pay', pay.handlePay(db))
app.delete('/userdelete', userdelete.handleUserDelete(db))
app.put('/changepassword', changepassword.handleChangePsw(db, bcrypt))
app.put('/cartdelete', cartdelete.handleCartDelete(db))
app.get('/discounts', discounts.handleDiscountName(db))
app.post('/productnew',productnew.handleProductNew(db))
app.delete('/productdelete', productdelete.handleProductDelete(db))
app.put('/productupdate', productupdate.handleProductUpdate(db))
app.post('/productnew', productnew.handleProductNew(db))
app.post('/discountnew', discountnew.handleDiscountNew(db))
app.put('/discountupdate', discountupdate.handleDiscountUpdate(db))
app.delete('/discountdelete', discountdelete.handleDiscountDelete(db))

const PORT = process.env.PORT
app.listen(PORT || 3000, ()=>{
	console.log(`app is running on port ${PORT}`);
})

console.log(PORT)