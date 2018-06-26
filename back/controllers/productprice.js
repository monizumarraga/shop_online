const handleProductprice = (db)=> (req, res) => {
	let totalprice=0
	const { code, number } = req.params;
	db.select('*').from('product').where({
		'code':code
	})
	.then (product => {
	if (product.length){
		if (product[0]["discount"]){
			db.select('*').from('discount').where({'name':product[0]["discount"]})
			.then (discount =>{
				let price= Math.floor(product[0]['price'])
				let priceRest= Math.floor(product[0]['price'])
				let isDiscount=false
				let units= Math.floor(number)
				let unitsRest=0
				if (discount[0]["min_quantity"]){
					if(units >= Math.floor(discount[0]["min_quantity"])){
						isDiscount=true
					}
				}
				if(discount[0]["round_unit"]){
					let round_unit=Math.floor(discount[0]["round_unit"])
					if(units >= round_unit){
						console.log("si aplica")
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
				totalprice= price * units + priceRest * unitsRest
				res.json(totalprice)
			})
		}
		else{
			totalprice=product[0]['price'] * Math.floor(number)
			res.json(totalprice)
		}
	}
	else{
		res.status(400).json('no products found')
	}
	})
	.catch(err => res.status(400).json('error getting product'))
}

module.exports = {
	handleProductprice: handleProductprice
}