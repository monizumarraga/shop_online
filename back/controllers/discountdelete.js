const handleDiscountDelete = (db) =>(req, res) =>  {
	const { name } = req.body;
	 db.select('*').from('discount').where({
			'name': name
		}).then (discount => {
			if (discount.length){
				db('discount').where('name',name).del()
				.then(name => {name
							res.json("discount deleted");
						})
				.catch(err => res.status(400).json('unable to delete'))
			} else {
				res.status(400).json('not found')
			}
		})
		.catch(err => res.status(400).json('error getting discount'))
}

module.exports = {
	handleDiscountDelete: handleDiscountDelete
};