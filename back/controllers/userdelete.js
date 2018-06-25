const handleUserDelete = (db) =>(req, res) =>  {
	const { id } = req.body;
	 db.select('*').from('users').where({
			'id': id
		}).then (user => {
			if (user.length){
				let email=user[0]["email"]
				db.transaction(trx =>{
				trx('users').where('email',email).del()
				.then(loginEmail => {
					return db('login').where('email',email).del()
						.then(user => {
							res.json("user deleted");
						})
				})
				.then(trx.commit)
				.catch(trx.rollback)
			})
			.then(resp => console.log('Transaction complete.'))
			.catch(err => res.status(400).json('unable to register'))
			} else {
				res.status(400).json('not found')
			}
		})
		.catch(err => res.status(400).json('error getting user'))
}

module.exports = {
	handleUserDelete: handleUserDelete
};