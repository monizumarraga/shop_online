const handleProductDelete = (db) =>(req, res) =>  {
	const { code } = req.body;
	 db.select('*').from('product').where({
			'code': code
		}).then (product => {
			if (product.length){
				db('product').where('code',code).del()
				.then(code => {code
							res.json("product deleted");
						})
				.catch(err => res.status(400).json('unable to delete'))
			} else {
				res.status(400).json('not found')
			}
		})
		.catch(err => res.status(400).json('error getting user'))
}

module.exports = {
	handleProductDelete: handleProductDelete
};