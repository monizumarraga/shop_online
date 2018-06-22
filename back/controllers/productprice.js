


const handleProductprice = (db)=> (req, res) => {
	let totalprice=0
	const { code, number } = req.params;
	db.select('*').from('product').where({
		'code':code
	})
	.then (product => {
		console.log(product)
	if (product.length){
		console.log(product)
		totalprice=product[0]['price'] * Math.floor(number)
		res.json(totalprice)
	}
	else{
		res.status(400).json('no products found')
	}
	})
	.catch(err => res.status(400).json('error getting product'))
}

module.exports = {
	handleProductprice: handleProductprice
}
