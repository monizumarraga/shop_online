const handleProduct = (db) => (req, res) => {
	const { id } = req.params;
	let found = false;
	db.select('*').from('product')
		.then (product => {
			if (product.length){
				res.json(product)
			} else {
				res.status(400).json('not found')
			}
		})
		.catch(err => res.status(400).json('error getting products'))
}

module.exports = {
	handleProduct: handleProduct
}