const knex = require('../db/knex');

const getPluById = async function(req, res) {
	
	res.setHeader('Content-Type', 'application/json');
	console.log("buscando pedidos del cliente");
	cliente= req.body.datos.cliente;
	comanda_id= req.body.datos.comanda_id;
	console.log(cliente);
	console.log(comanda_id);
	if(comanda_id!=undefined && cliente!=undefined){
	knex.select('pedido.id','pedido.plu_id','pedido.estadoPedido','pedido.cliente_id','pedido.comanda_id_comanda','plu.id'
	,'plu.nombre AS name')
	.from('pedido')
	.innerJoin('plu', 'pedido.plu_id', 'plu.id')
	.where(function() {
		this.where({'pedido.comanda_id_comanda': comanda_id})
		.andWhere(function() {
			this.where({'pedido.estadoPedido': "p"})
			.andWhere({'pedido.cliente_id': cliente})
		  })
		})
    .then(user =>{
		console.log(user)
		if(user.length>0){
			return ReS(res, {pedidos:user, existe:true}, 201);
			
		}
		return ReS(res, {existe:false}, 201);
	});
}

}
module.exports.getPluById = getPluById;

const getById = async function(req, res) {
	
	res.setHeader('Content-Type', 'application/json');
	console.log("buscando cliente");
	cedula= req.body.id;
	console.log(cedula)
	knex('clientes')
	.where({'id': cedula})
	// .and('TB_SYS_USER_TABLE.password', body.password)
    .then(user =>{
		console.log(user)
		if(user.length>0){
			return ReS(res, {client:user, existe:true}, 201);
			
		}
		return ReS(res, {existe:false}, 201);
	});


}
module.exports.getById = getById;

const getByCedula = async function(req, res) {
	
	res.setHeader('Content-Type', 'application/json');
	console.log("buscando cliente");
	cedula= req.body.cedula;
	console.log(cedula)
	knex('clientes')
	.where({'cedula': cedula})
	// .and('TB_SYS_USER_TABLE.password', body.password)
    .then(user =>{
		console.log(user)
		if(user.length>0){
			return ReS(res, {client:user, existe:true}, 201);
			
		}
		return ReS(res, {existe:false}, 201);
	});


}
module.exports.getByCedula = getByCedula;

const create = async function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	cliente=req.body.datos;
	console.log(cliente)
	knex('clientes')
	.returning('*')
	.insert({nombre:cliente.nombre, telefono:cliente.telefono,
			 correo:cliente.correo, direccion:cliente.direccion,
			cedula:cliente.cedula})
    .then(cliente =>{
		return ReS(res, {client:cliente, message:"succes"}, 201);

	})
}
module.exports.create = create;