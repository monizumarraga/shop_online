const handleChangePsw = (db, bcrypt)=> (req, res) => {
	const { email, password, newpassword } = req.body;
	const num_charact=8;
	if (newpassword.length<num_charact) {
		return res.status(400).json(`incorrect password length, at least ${num_charact} digits`)
	}
	db.select('email', 'hash').from('login')
			.where('email', '=', email)
			.then(data =>{
			const isValid = bcrypt.compareSync(password, data[0].hash);
			console.log(email)
			if (user.length){
			const hash = bcrypt.hashSync(newpassword);
			console.log("llega")
				if(isValid){

	console.log(email)
	console.log(password)
	console.log(newpassword)
			    db('login')
					.where('email', '=', email)
						.update(
							{
							hash: hash
						})
						.then(user => {
							if (user){
								res.json("password update")
							} else {
							res.status(400).json('not found')
						}
						})
					.catch(err => res.status(400).json('unable to update password'))
				}
				else{
					return res.status(400).json('credentials don´t match')
				}
			} else {
				res.status(400).json('user not found')
			}
	})
	.catch(err => res.status(400).json('error'))
}

module.exports = {
	handleChangePsw: handleChangePsw
}