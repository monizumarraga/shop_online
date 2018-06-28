

const handleTotalprice = (db)=> (req, res,pool) => {
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
								db.transaction(trx => {
									product.map((elem, i)=>{
										if(obj[elem["code"]]){
												db.select('*').from('discount')
												.where({
													'name':elem['discount']
												})
												.then (discount => {
													let price= Math.floor(elem['price'])
													let priceRest= Math.floor(elem['price'])
													let isDiscount=false
													let units= Math.floor(obj[elem["code"]])
													let unitsRest=0
													if(discount[0]){
														if (discount[0]["min_quantity"]){
															if(units >= Math.floor(discount[0]["min_quantity"])){
																isDiscount=true
															}
														}
														if(discount[0]["round_unit"]){
															let round_unit=Math.floor(discount[0]["round_unit"])
															if(units >= round_unit){
																isDiscount=true
																if(round_unit){
																		let divid= units % round_unit
																		let resto = units / round_unit
																	if((units % round_unit)===0){
															  		 	units= units 
															  		 }else{
															  		 	unitsRest= units % round_unit
															  			units =  (units - unitsRest) 
															  		}
																}
															}
														}
														if(isDiscount===true){
															if (discount[0]["percentage"]){
																price=price*Math.floor(discount[0]["percentage"])/100
															}
															if(discount[0]["newprice"]){
																price= Math.floor(discount[0]["newprice"])
															}
														}
													}
													else{
													}
													totalprice= totalprice + price * units + priceRest * unitsRest
												})
												.catch(err => res.status(400).json('error getting discount'))
										}

									})
								})
								return trx
								.select('*').from('product')
								.then(function(res) {
									console.log("resultado")
									res.json(totalprice)
								})
								.catch(err => res.status(400).json(err))
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
	handleTotalprice: handleTotalprice
}

