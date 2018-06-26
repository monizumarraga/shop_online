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
			if(trans){
				obj=JSON.parse(trans)
				let sql= "UPDATE product units = ? WHERE code= ?"
				let codeUpdate =[];
				let unitUpdate =[];
				let updateData =[];
				db.select('*').from('product')
				.then (product => {
					if (product.length){
						db.transaction(trx => {
							product.map((elem)=>{
								if(Math.floor(obj[elem["code"]]) > Math.floor(elem['units'])){
									res.status(400).json(`there are not enough ${elem["code"]}`)
								}
								else{
									if(obj[elem["code"]]){
										let new_quantity=  	Math.floor(elem['units']) - Math.floor(obj[elem["code"]]) 
										db('product')
											.where('code', '=', elem['code'])
											.update(
												{
												units: new_quantity
											})
											.catch(err => res.status(400).json('unable to update product list'))
									}
								}
							})	
							return trx
								.where('id', '=', id)
								.update(
									{
									cart:''
								})
								.into('users')
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
							})
						.catch(function(err) {
							res.status(400).json(err);
						});
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