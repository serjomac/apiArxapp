
const knex = require('../db/knex');

const readByUser = async function(req, res) {
	
	res.setHeader('Content-Type', 'application/json');
	console.log("autenticando");
	body= req.body;
	console.log(body.user)
	knex('DEMO_ACCOUNTS')
	.where({'DEMO_ACCOUNTS.AD_ACCOUNT_ID_USER': body.user})
	// .and('TB_SYS_USER_TABLE.password', body.password)
    .then(account =>{
		console.log(account)
		if(account.length>0){
			return ReS(res, {account:account}, 201);
			
		}
		return ReS(res, {message:"no existe"}, 404);
	});

}
module.exports.readByUser = readByUser;

