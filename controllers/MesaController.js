const authService 	= require('../services/AuthService');
const knex = require('../db/knex');

const read = async function(req, res) {
	
	res.setHeader('Content-Type', 'application/json');
	console.log("read mesas");
	body= req;
	
	knex.select('mesa.id','mesa.mesero','mesa.ocupantes','mesa.numero_mesa','mesa.estado','user.username')
	.from('mesa')
	.innerJoin('user', 'mesa.mesero', 'user.id')
	//.where({'TB_SYS_USER_TABLE.user': body.user})
	// .and('TB_SYS_USER_TABLE.password', body.password)
    .then(user =>{
		
		if(user.length>0){
			return ReS(res, {message:"ok", mesa:user}, 201);
			
		}
		return ReS(res, {message:"no existe"}, 201);
	});
	
}
module.exports.read = read;


const mesaById =  async function(req, res) {
	
	res.setHeader('Content-Type', 'application/json');
	console.log("mesa by id");
	body= req.body;
	let id=body.id;
   
	knex.select('mesa.id','mesa.mesero','mesa.ocupantes','mesa.numero_mesa','mesa.estado','user.username')
	.from('mesa')
	.innerJoin('user', 'mesa.mesero', 'user.id')
	.where({'mesa.id': id})
	// .and('TB_SYS_USER_TABLE.password', body.password)
    .then(user =>{
		
		if(user.length>0){

		// io.on('connection', (socket) => {
		// 	io.emit("result",user);
		// }) 
		  return ReS(res, {message:"ok", mesa:user}, 201);
			
		
	}
		return ReS(res, {message:"no existe"}, 201);
	});
}
module.exports.mesaById = mesaById;

const mesaFactura =  async function(req, res) {

	res.setHeader('Content-Type', 'application/json');
	console.log("mesa by id");
	body= req.body;
	let id=body.id;
	console.log("puto kevin hdp pendejo");
	knex.select('clientes.nombre AS cliente','clientes.cedula', 'plu.nombre AS plato','plu_x_comanda.detalle_plu AS detalle','plu_x_comanda.cantidad_plu AS cantidad',' plu.precio')
	.from('mesa')
	.innerJoin('comanda', 'mesa.id', 'comanda.mesa_id_mesa')
	.innerJoin('pedido', 'pedido.comanda_id_comanda', 'comanda.id')
	.innerJoin('clientes', 'clientes.id', 'pedido.cliente_id')
	.innerJoin('plu', 'plu.id', 'pedido.plu_id')
	.innerJoin('plu_x_comanda', 'plu_x_comanda.plu_id', 'plu.id')
	.where(function() {
		this.where({'mesa.id': id})
		.andWhere(function() {
			this.where({'pedido.estadoPedido': "p"})
		  })
		})
    .then(user =>{
		console.log(user)
		if(user.length>0){
		var cliente = { 
			nombre : user[0].cliente,
			cedula : user[0].cedula,
		}
		var subtotal = 0;
		var acum = 0;
		for (let index = 0; index < user.length; index++) {
			acum = user[index].cantidad * user[index].precio;
			subtotal = subtotal+acum;
		}
		var iva = subtotal * 0.12;
		var total =  subtotal + iva;
		var datosFactura ={
			subtotal : subtotal,
			iva : iva,
			total : total,
		}
		console.log(cliente)
		  return ReS(res, {message:"ok", pedidos:user, cliente:cliente, valores:datosFactura}, 201);
			
		
	}
		return ReS(res, {message:"no existe"}, 201);
	});
}
module.exports.mesaFactura = mesaFactura;


const crearFactura =  async function(req, res) {

	res.setHeader('Content-Type', 'application/json');
	console.log("mesa by id");
	body= req.body;
	//let id=body.id;
	console.log("puto kevin hdp pendejo");
	res.socketApi.sendFacturaCreada("correcto")
	
// knex('factura')
// .returning("*")
// .insert({total:total, iva:iva, subtotal:subtotal,id_comanda:comanda})
// .then( pedido=>{	
// 	if (pedido) {
// 		knex('comanda')
// 		.update({
// 			estado: "t"
// 		})
// 		.where({id:comanda})
// 		.then(suc=>{
// 			console.log(suc)
// 		})
// pedidos.forEach(element => {
	
// 		knex('pedido')
// 		.update({
// 			estadoPedido: "c"
// 		})
// 		.where({id:element.id})
// 		.then(suc=>{
// 			console.log(suc)
// 		})
// 		});
// 	}

// })
}
module.exports.crearFactura = crearFactura;
