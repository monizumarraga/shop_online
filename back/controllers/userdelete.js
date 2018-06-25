const handleUserDelete = (db) =>(req, res) =>  {
	const { id } = req.body;
	 db.select('*').from('users').where({
			'id': id
		}).then (user => {
			if (user.length){
				let email=user[0]["email"]
				console.log(email)
				var sql = `DELETE FROM users WHERE id = ${id}`;
				  bd.query(sql, function (err, result) {
				    if (err) throw err;
				    console.log("user deleted from users");
				});
				  var sql1 = `DELETE FROM login WHERE email = ${email}`;
				  bd.query(sql1, function (err, result) {
				    if (err) throw err;
				    console.log("user deleted from login");
				});
			} else {
				res.status(400).json('not found')
			}
		})
		.catch(err => res.status(400).json('error getting user'))
}

module.exports = {
	handleUserDelete: handleUserDelete
};