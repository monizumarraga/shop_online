const handleProductNew = (db) =>(req, res) =>  {
	const { code, name, price, units, discount } = req.body;
	let newunits=0
    if (!code) {
		return res.status(400).json('incorrect code')
	}
	if (!name) {
		return res.status(400).json('incorrect name')
	}
	if (!price) {
		return res.status(400).json('incorrect price')
	}
	if (units) {
		newunits=units
	}
	db.select('code').from('product')
	.where('code', '=', code)
			.then(data =>{
				if(data[0]){
					res.status(400).json('existing product code')
				}
				db.select('name').from('discount')
						.where('name', '=', discount)
						.then(data =>{
							if (!data[0] && discount != ""){
								res.status(400).json('incorrect discount')
							}
							if (data || discount===""){
								db
									.insert({
										code: code,
										name: name,
										price: price,
										units: newunits,
										discount: discount
									})
									.into('product')
									.returning('*')
									.then(product => {
										res.json(product);
									})
									.catch(err => res.status(400).json('product not added'))
							} else {
							res.status(400).json('incorrect discount')
							}
						})
						.catch(err => res.status(400).json('error getting discount'))
	})
	.catch(err => res.status(400).json('error getting product'))
}

module.exports = {
	handleProductNew: handleProductNew
};