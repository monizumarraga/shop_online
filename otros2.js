trx.
							where('code', '=', "MUG")
								.from('product')
								.update(
									{
									units: 92
								})



								trx.update('UPDATE product'+'(code, units)'+'VALUES'+($1, $2),updateData)