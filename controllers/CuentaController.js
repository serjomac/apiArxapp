const authService 	= require('../services/AuthService');
const knex = require('../db/knex');









const create = async function(req, res) {
	
	res.setHeader('Content-Type', 'application/json');
	console.log("autenticando");
	
    let body=req.body.body;
	console.log(body)
	knex('comanda')
	.returning('*')
	.insert({mesa_id_mesa:body.mesa, estado:"e"})
    .then(transfer =>{
		console.log(transfer)
		if(transfer.length>0){
			console.log(transfer)
			body.Plu.forEach(element => {
			knex('plu_x_comanda')
			.insert({comanda_id:transfer[0].id, plu_id:element.id, cantidad_plu:element.cantidad
			         ,detalle_plu:element.detalle})
			.then(plu =>{
			
					//return ReS(res, {message:"succes"}, 201);
				
				
			})
			});
			return ReS(res, {message:"succes"}, 201);
			
		}
		return ReS(res, {message:"insert fallid"}, 404);
	});


}
module.exports.create = create;





