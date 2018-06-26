

const handleTotalprice = (db)=> (req, res) => {
	let totalprice=0
	const { id } = req.params;
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
					db.select('*').from('product')
						.then (product => {
						if (product.length){
							product.map((elem)=>{
								if(obj[elem["code"]]){
									
										totalprice=totalprice + elem['price'] * Math.floor(obj[elem["code"]])
									}
								
							})
							res.json(totalprice)
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

TotalPrice =(db, obj) =>{
	Object.keys(obj).map((prod, units,i) => {
		db.select('price').from('product')
			.where({
				'code':prod
			})
			.then (product => {
			if (product.length){
					totalprice=totalprice + product[0]['price'] * Math.floor(obj[prod])
				}
				else{
					res.status(400).json('no products found')
				}
			})
			.catch(err => res.status(400).json('error getting product'))
	})
}

module.exports = {
	handleTotalprice: handleTotalprice
}

