const handleDiscountNew = (db) =>(req, res) =>  {
	const { name, min_quantity, round_unit, percentage, newprice } = req.body;
	let newmin_quantity=null
	let newround_unit=null
	let newpercentage=null
	let newnewprice=null
	if (!name) {
		return res.status(400).json('incorrect name')
	}
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
	db.select('name').from('discount')
	.where('name', '=', name)
			.then(data =>{
				if(data[0]){
					res.status(400).json('existing discount code')
				}
				db
					.insert({
						name: name,
						min_quantity: newmin_quantity,
						round_unit: newround_unit,
						percentage: newpercentage,
						newprice: newnewprice
					})
					.into('discount')
					.returning('*')
					.then(discount => {
						res.json("discount added");
					})
					.catch(err => res.status(400).json('discount not added'))
	})
	.catch(err => res.status(400).json('error getting discount'))
}

module.exports = {
	handleDiscountNew: handleDiscountNew
};