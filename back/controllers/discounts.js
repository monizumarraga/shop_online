const handleDiscountName = (db) => (req, res) => {
	db.select('*').from('discount').orderBy('name')
		.then (discounts => {
			if (discounts.length){
				res.json(discounts)
			} else {
				res.status(400).json('not found')
			}
		})
		.catch(err => res.status(400).json('error getting discounts'))
}

module.exports = {
	handleDiscountName: handleDiscountName
}