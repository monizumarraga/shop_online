const handleProductUpdate = (db)=> (req, res) => {
	const { code, units, price, discount } = req.body;
	db.select('*').from('product').where({
			'code': code
		}).then (product => {
			if (product.length){
				let totunits= Math.floor(units) + Math.floor(product[0]["units"])
				console.log(totunits)
				db('product')
					.where('code', '=', code)
						.update(
							{
							units: totunits,
							price: price,
							discount: discount
						})
						.then(prod => {
							if (prod){
								res.json(product)
							} else {
							res.status(400).json('not found')
							}
						})
					.catch(err => res.status(400).json('unable to update product'))
			} else {
				res.status(400).json('user not found')
			}
		})
		.catch(err => res.status(400).json('error'))
}

module.exports = {
	handleProductUpdate: handleProductUpdate
}