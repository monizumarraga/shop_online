
	const { id, nameChange, email, addressChange } = req.body;
	const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
	db.select('*').from('users').where({
			'id': id
		}).then (user => {
			if (user.length){
				db.select('*').from('login').where({
						'email': email
					}).then (login => {
						if (login.length){
							if (!emailRegex.test(email)) {
						    	return res.status(400).json('incorrect email');
						    }
						    if (!name) {
								return res.status(400).json('incorrect name')
							}
							if (email != user[0]["email"]){
								db.transaction(trx =>{
								trx.update({
									email: email
								})
								.into('login')
								.where({
									id: id
								})
								.returning('email')
								.then(loginEmail => {
									return db('users')
										.returning('*')
										.update({
											email: loginEmail[0],
											name: name,
											address: address
										})
										.then(user => {
											res.json(user[0]);
										})
								})
								.then(trx.commit)
								.catch(trx.rollback)
							})
							.then(resp => console.log('Transaction complete.'))
							.catch(err => res.status(400).json('unable to register'))
							}else{
								db('users')
								.where('id', '=', id)
									.update(
										{
										name: nameChange
										address: addressChange
									})
									.then(cart => {
										if (cart){
											res.json("user update")
										} else {
										res.status(400).json('not found')
									}
									})
								.catch(err => res.status(400).json('unable to update cart'))
							}								
						} else {
							res.status(400).json('login not found')
						}
					})
					.catch(err => res.status(400).json('error getting login'))


			} else {
				res.status(400).json('user not found')
			}
		})
		.catch(err => res.status(400).json('error'))