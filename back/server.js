const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const stripe = require('stripe')('sk_test_...');
var mysql = require('mysql');

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

var db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Monica.301184',
    database : 'shop'
  }
});

var connection = mysql.createConnection({
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Monica.301184',
    database : 'shop'
});

stripe.customers.create(
  { email: 'customer@example.com' },
  function(err, customer) {
    err; // null if no error occurred
    customer; // the created customer object
  }
);

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


app.post('/signin', signin.handleSignin(db,bcrypt))
app.post('/register',register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfile(db))
app.get('/products', products.handleProduct(db))
app.put('/cartupdate', cartupdate.handleCartProduct(db))
app.get('/totalprice/:id', totalprice.handleTotalprice(db))
app.get('/productprice/:code/:number', productprice.handleProductprice(db))
app.put('/change', change.handleChange(db))
app.delete('/userdelete', userdelete.handleUserDelete(db))
app.put('/changepassword', changepassword.handleChangePsw(db, bcrypt))
app.put('/cartdelete', cartdelete.handleCartDelete(db))

app.put('/pay', pay.handlePay(db, connection))

const PORT = process.env.PORT
app.listen(PORT || 3000, ()=>{
	console.log(`app is running on port ${PORT}`);
})

console.log(PORT)