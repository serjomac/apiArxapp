const knex = require('../db/knex');

const login = async function(req, res) {
	
	res.setHeader('Content-Type', 'application/json');
	console.log("autenticando");
	body= req.body.body;

	knex('user')
	.where({'username': body.user,
	'user.password':  body.password})
	// .and('TB_SYS_USER_TABLE.password', body.password)
    .then(user =>{
		
		if(user.length>0){
			return ReS(res, {user:user}, 201);
			
		}
		return ReS(res, {message:"no existe"}, 201);
	});
	
}

const postNotificaciones = async function(req, res){
	res.setHeader('Content-Type', 'application/json');
	knex("notificaciones")
	.insert({
		estado: req.body.estado,
		fecha_ingreso: req.body.fecha_ingreso,
		fecha_salida: req.body.fecha_salida,
		id_residente: req.body.id_residente,
		id_visitante: req.body.id_visitante,
		invitacion_activa: req.body.invitacion_activa,
		lastname: req.body.lastname,
		name: req.body.name,
		username: req.body.username
	}).then(noticiacion => {
		res.socketApi.sendRes(noticiacion, "")
		return ReS(res, {res:"ok", noticiacion:noticiacion}, 201);
	})
}

module.exports.postNotificaciones = postNotificaciones;

