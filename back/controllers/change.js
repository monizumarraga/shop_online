const handleChange = (db)=> (req, res) => {
	const { id, name, address } = req.body;
	db.select('*').from('users').where({
			'id': id
		}).then (user => {
			if (user.length){
			    if (!name) {
					return res.status(400).json('incorrect name')
				}
					db('users')
					.where('id', '=', id)
						.update(
							{
							name: name,
							address: address
						})
						.then(cart => {
							if (cart){
								res.json("user update")
							} else {
							res.status(400).json('not found')
						}
						})
					.catch(err => res.status(400).json('unable to update cart'))
			} else {
				res.status(400).json('user not found')
			}
		})
		.catch(err => res.status(400).json('error'))
}

module.exports = {
	handleChange: handleChange
}