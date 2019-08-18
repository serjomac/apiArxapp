const authService 	= require('../services/AuthService');
const knex = require('../db/knex');





const getByMesa = async function(req, res) {
	
	res.setHeader('Content-Type', 'application/json');
	console.log("getbymesa");
	let body=req.body
	id=body.mesa
	// console.log(req.body)
	// id=req.body.id
	knex.select('plu_x_comanda.px_estado','plu.nombre','comanda.id','comanda.estado','comanda.mesa_id_mesa','plu_x_comanda.comanda_id'
	,'plu_x_comanda.cantidad_plu','plu_x_comanda.plu_id'
	,'plu_x_comanda.detalle_plu')
	.from('comanda')
	.innerJoin('plu_x_comanda', 'comanda.id', 'plu_x_comanda.comanda_id')
	.innerJoin('plu', 'plu.id', 'plu_x_comanda.plu_id')
	.where(function() {
		this.where({'comanda.mesa_id_mesa': id})
		.andWhere(function() {
			this.where({'comanda.estado': "e"})
			.orWhere({'comanda.estado': "a"})
		  })
		  .andWhere(function() {
			this.where({'plu_x_comanda.px_estado': "n"})
			//.orWhere({'plu_x_comanda.px_estado': "n"})
			
		  })
	  })
	// .and({'comanda.estado': "e"})
	// .or({'comanda.estado': "a"})
    .then(transfer =>{
		console.log(transfer)
	
		return ReS(res, {plu:transfer}, 201);
	});


}

module.exports.getByMesa = getByMesa;



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
			         ,detalle_plu:element.detalle,px_estado:"n" })
			.then(plu =>{
				knex('mesa')
				.returning('*')
				.where({'mesa.id': body.mesa})
				.update({
					estado: "2"
				})
				.then( result =>   {
					res.socketApi.sendEstaMesa(result[0])
					
				  });
				
				
			})
			});
			return ReS(res, {message:"succes",comanda:transfer}, 201);
			
			
		}
		return ReS(res, {message:"insert fallid"}, 404);
	});


}
module.exports.create = create;


const getPedidosByComanda = async function(req, res) {
	let body=req.body.body
	console.log("getPedidosByComanda ")
	mesa=body.mesa
	comanda=body.comanda
	knex('pedido')
	.where({ comanda_id_comanda:comanda,estadoPedido:'p'})
	.then(pedidos=>{
		console.log("pedidos")
		console.log(pedidos)
		return ReS(res, {pedidos:pedidos}, 201);
	})

}
module.exports.getPedidosByComanda = getPedidosByComanda;
const pedidoUpdate = async function(req, res) {
	let body=req.body.body
	console.log("Actualizando pedidos")
	mesa=body.mesa
	comanda=body.comanda
	
	estadoMesa=body.estadoMesa
	estadoComanda=body.estadoComanda
	pedidos= body.pedidos
	

	 new Promise(async function(resolve, reject) { pedidos.forEach(plu=>{
		knex('pedido')
		.returning("*")
		.update({estadoPedido:"c"})
		.where({ plu_id:plu,estadoPedido:"p"})
		.then( pedido=>{	
			console.log(pedido)
			
		knex('plu_x_comanda')
		.update({
			px_estado: "c"
		})
		.where({comanda_id:comanda, plu_id:plu})
		.then(suc=>{
			console.log(suc)
			knex('pedido')
			.where({ comanda_id_comanda:comanda,estadoPedido:'p'})
			.then(pedidos=>{
				console.log("pedidos vigentes")
				console.log(pedidos)
				if(pedidos.length<1){
					knex('mesa')
					.where({'mesa.id': mesa})
					.update({
						estado: estadoMesa
					})
					.then(  () =>  {
						console.log("upd")
					 knex('comanda')
					.where({'comanda.id': comanda})
					.update({
						estado: estadoComanda
					})
					.then(  () =>  {
						return ReS(res, {message:"succes"}, 201);
						});
					  });   
					
				}else{
					return ReS(res, {message:"no complete"}, 201);
				}
			})
		  })
		})
		
	
		
	})
})
	 

}
module.exports.pedidoUpdate = pedidoUpdate;

const update = async function(req, res) {
	
	res.setHeader('Content-Type', 'application/json');
	console.log("actualizando");
	let body=req.body.body
	console.log(body)
	mesa=body.mesa
	comanda=body.comanda
	cliente=body.cliente
	estadoMesa=body.estadoMesa
	estadoComanda=body.estadoComanda
	pedidos= body.pedidos
	
	// console.log(req.body)
	// id=req.body.id

		pedidos.forEach(plu=>{
		knex('pedido')
		.returning("*")
		.insert({plu_id:plu, cliente_id:cliente, estadoPedido:"p",comanda_id_comanda:comanda})
		.then( pedido=>{	
			console.log("pedido")
			console.log(pedido)
		
		knex('plu_x_comanda')
		.update({
			px_estado: "p"
		})
		.where({comanda_id:comanda, plu_id:plu})
		.then(suc=>{
			console.log(suc)
		  })
		})
	     
		
		
	})

	knex('mesa')
	.where({'mesa.id': mesa})
	.update({
		estado: estadoMesa
	})
	.then(  () =>  {
		console.log("upd")
     knex('comanda')
	.where({'comanda.id': comanda})
	.update({
		estado: estadoComanda
	})
	.then(  () =>  {
		return ReS(res, {message:"succes"}, 201);
	    });
	  });

	  

}

module.exports.update = update;

const updateEstado =  async function(req, res) {
	res.setHeader("Content-type", "application/json")
	   console.log("actualizando estado")
	estado=req.body.datos.estado
	comanda=req.body.datos.id_comanda
	knex('comanda')
	.returning("*")
	.where({'comanda.id': comanda})
	.update({
		estado: estado
	})
	.then(  result =>  {
		console.log(result)
		// io.on('connection', (socket) => {
		// 	io.emit("result",result[0]);
			
		// }) 
		console.log(res.socketApi)
		res.socketApi.sendRes(result[0])
		    
		
		return ReS(res, {message:"succes",result:result[0]}, 201);
	    })
}

module.exports.updateEstado = updateEstado;