const handlePay = (db, connection) =>(req, res) =>  {
	const { id, totalprice } = req.body;
	db.select('*').from('users').where({
	'id': id
	}).then (user => {
		if (user.length){
			let obj=[]
			let trans=""
			trans=user[0]["cart"]
			trans=trans.replace(/[\\]/g,'')
			if(trans){
				obj=JSON.parse(trans)
				let sql= "UPDATE product units = ? WHERE code= ?"
				let codeUpdate =[];
				let unitUpdate =[];
				let updateData =[];
				db.select('*').from('product')
				.then (product => {
					if (product.length){
						product.map((elem)=>{
							if(Math.floor(obj[elem["code"]]) > Math.floor(elem['units'])){
								res.json(`there are not enough ${elem["code"]}`)
							}
							else{
								if(obj[elem["code"]]){
									let new_quantity=  	Math.floor(elem['units']) -Math.floor(obj[elem["code"]]) 
									updateData.push({
										code: elem['code'],
										units: new_quantity
									})
									codeUpdate.push({
										code:elem["code"]
									})
									unitUpdate.push({
										units: new_quantity
									})
								}
							}
						})
						let data=JSON.stringify(updateData)
						console.log(data)
						console.log("hasta aqui")
						db.transaction(trx => {
						console.log("hasta aqui 2")
						trx.
							where(codeUpdate)
								.from('product')
								.update(unitUpdate)
							.then(user => {
								db('users')
								.where('id', '=', id)
								.update(
									{
									cart:''
								})
								.then(user => {
									if (user){
										res.json("payment succed")
									} else {
										res.status(400).json('not found')
									}
								})
								.catch(err => res.status(400).json('unable to update cart'))
								.then(trx.commit)
								.catch(trx.rollback);
							})
							.then(function(resp) {
								console.log('Transaction complete.');
							})
						.catch(function(err) {
							console.error(err);
						});
					})
					}
					else {
						res.status(400).json('no products found')
					}
				})
				.catch(err => res.status(400).json('error getting product'))


			}else{
				res.status(400).json('no products found in the cart')
			}
		} else {
			res.status(400).json('user not found')
		}
	})
	.catch(err => res.status(400).json('error'))
}

module.exports = {
	handlePay: handlePay
};