const authService 	= require('../services/AuthService');
const knex = require('./../db/knex');

const read = async function(req, res) {
	
	res.setHeader('Content-Type', 'application/json');
	console.log("autenticando");
	body= req;

	knex('plu')
	//.where({'TB_SYS_USER_TABLE.user': body.user})
	// .and('TB_SYS_USER_TABLE.password', body.password)
    .then(user =>{
		
		if(user.length>0){
			return ReS(res, {message:"ok", plu:user}, 201);
			
		}
		return ReS(res, {message:"no existe"}, 404);
	});
	
}
module.exports.read = read;
