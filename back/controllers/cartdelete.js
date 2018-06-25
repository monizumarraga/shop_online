const handleCartDelete = (db)=> (req, res) => {
	const { id } = req.body;
	db('users')
		.where('id', '=', id)
			.update(
				{
				cart: ''
			})
			.then(cart => {
				db.select('*').from('users').where({
					'id': id
				}).then (user => {
					if (user.length){
						res.json(user[0])
					} else {
						res.status(400).json('not found')
					}
				})
				.catch(err => res.status(400).json('error getting user'))
			})
		.catch(err => res.status(400).json('error updating cart'))
								
}

module.exports = {
	handleCartDelete: handleCartDelete
}