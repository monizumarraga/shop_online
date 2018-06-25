const handleCartProduct = (db)=> (req, res) => {
	const { id, code, number, update } = req.body;
	db.select('*').from('users').where({
			'id': id
		}).then (user => {
			if (user.length){
				db.select('*').from('product').where({
						'code': code
					}).then (product => {
						if (product.length){
							if (number <=product[0]["units"]){
								let obj={}
								let trans=""
								trans=user[0]["cart"]
								trans=trans.replace(/[\\]/g,'')
								if(trans){
									obj=JSON.parse(trans)
									if(obj[code]){
										if (update){
											obj[code]=Math.floor(number)
										}else{
											obj[code]=Math.floor(number) + Math.floor(obj[code])
										}
										if(obj[code]===0){
											delete obj[code]
										}
									}
									else{
										obj[code]= Math.floor(number)								
									}
								}
								else{
									obj[code]= Math.floor(number)
								}
								if (!obj){
									obj={}
								}
								db('users')
								.where('id', '=', id)
									.update(
										{
										cart: obj
									})
									.then(cart => {
										if (cart){
											if (obj[code]){
												res.json(obj[code])
											}else{
												res.json(0)
											}
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
					.catch(err => res.status(400).json('error getting product'))


			} else {
				res.status(400).json('user not found')
			}
		})
		.catch(err => res.status(400).json('error'))
}

module.exports = {
	handleCartProduct: handleCartProduct
}