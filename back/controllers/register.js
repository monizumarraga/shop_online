const handleRegister = (db, bcrypt) =>(req, res) =>  {
	const num_charact=8;
	const { email, name, password } = req.body;
	const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (!emailRegex.test(email)) {
    	return res.status(400).json('incorrect email');
    }
    if (!name) {
		return res.status(400).json('incorrect name')
	}
	if (password.length<num_charact) {
		return res.status(400).json(`incorrect password length, at least ${num_charact} digits`)
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