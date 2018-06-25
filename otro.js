const handlePay = (db) =>(req, res) =>  {
	const { id, totalprice } = req.body;
	db.select('*').from('users').where({
	'id': id
	}).then (user => {
		if (user.length){
			let obj=[]
			let trans=""
			trans=user[0]["cart"]
			trans=trans.replace(/[\\]/g,'')
			console.log(trans)
			if(trans){
				obj=JSON.parse(trans)
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
									console.log("calcular")
									let new_quantity=  	Math.floor(elem['units']) -Math.floor(obj[elem["code"]]) 
									console.log(new_quantity)
									updateData.push({
										code: elem['code'],
										units: elem['units']
									})
									console.log(updateData)
								}
							}
						})
						console.log(updateData)
						db.transaction(trx => {
							trx..update(updateData)
							.from (values `${value}`) as u2(code, units)
							.where u2.id = u.id;
							.then(user => {
								db('users')
								.where('id', '=', id)
								.update(
									{
									cart=''
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



					}
					else{
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