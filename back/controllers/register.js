const handleRegister = (db, bcrypt) =>(req, res) =>  {
	const { email, name, password } = req.body;
	const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (!emailRegex.test(email)) {
    	console.log('incorrect email.')
    	return res.status(400).json('incorrect email');
    }
    if (!name) {
    	console.log('incorrect name.')
		return res.status(400).json('incorrect name')
	}
	if (password.length<8) {
    	console.log('incorrect password length, at least 8 digits.')
		return res.status(400).json('incorrect password length, at least 8 digits')
	}
	const hash = bcrypt.hashSync(password);
	db.transaction(trx =>{
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return db('users')
				.returning('*')
				.insert({
					email: loginEmail[0],
					name: name,
					joined: new Date()
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
}

module.exports = {
	handleRegister: handleRegister
};