const handleCartProduct = (db)=> (req, res) => {
	const { id, code, number } = req.body;
	db.select('*').from('users').where({
			'id': id
		}).then (user => {
			if (user.length){
				db.select('*').from('product').where({
						'code': code
					}).then (product => {
						if (product.length){
							if (number <=product[0]["units"]){
								let obj=[]
								let trans=""
								trans=user[0]["cart"]
								trans=trans.replace(/[\\]/g,'')
								if(trans){
									obj=JSON.parse(trans)
									if(obj[code]){
										obj[code]=Math.floor(number) + Math.floor(obj[code])
									}
									else{
										obj[code]= number								
									}

								}
								else{
									obj[code]= number
								}
								db('users')
								.where('id', '=', id)
									.update(
										{
										cart: obj
									})
									.then(cart => {
										if (cart){
											res.json(obj[code])
										} else {
										res.status(400).json('not found')
									}
									})
								.catch(err => res.status(400).json('unable to update cart'))
								
							}
								else{
									res.status(400).json('product available units not enough')
								}
						} else {
							res.status(400).json('product not found')
						}
					})
					.catch(err => res.status(400).json('error getting user'))


			} else {
				res.status(400).json('user not found')
			}
		})
		.catch(err => res.status(400).json('error getting user'))
}

module.exports = {
	handleCartProduct: handleCartProduct
}