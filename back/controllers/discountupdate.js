const handleDiscountUpdate = (db)=> (req, res) => {
	const { name, min_quantity, round_unit, percentage, newprice } = req.body;
	console.log(name)
	console.log(min_quantity)
	console.log(round_unit)
	console.log(percentage)
	console.log(newprice)
	let newmin_quantity=null
	let newround_unit=null
	let newpercentage=null
	let newnewprice=null
	if (!min_quantity && !round_unit) {
		return res.status(400).json('incorrect units')
	}
	if (!percentage && !newprice) {
		return res.status(400).json('incorrect price')
	}
	 if (min_quantity) {
		newmin_quantity=min_quantity
	}
	 if (round_unit) {
		newround_unit=round_unit
	}
	if (percentage) {
		newpercentage=percentage
	}
	if (newprice) {
		newnewprice=newprice
	}
	db('discount')
		.where('name', '=', name)
			.update(
				{
				min_quantity: newmin_quantity,
				round_unit: newround_unit,
				percentage: newpercentage,
				newprice: newnewprice
			})
			.then(prod => {
				if (prod){
					res.json("discount update")
				} else {
				res.status(400).json('not found')
				}
			})
		.catch(err => res.status(400).json('unable to update discount'))
}

module.exports = {
	handleDiscountUpdate: handleDiscountUpdate
}