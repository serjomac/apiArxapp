const knex = require('./../db/knex');
const validator     = require('validator');

const getUniqueKeyFromBody = function(body) {// this is so they can send in 3 options unique_key, email, or phone and it will work
	let unique_key = body.unique_key;
	if(typeof unique_key==='undefined') {
		if(typeof body.email != 'undefined') {
			unique_key = body.email
		} else if(typeof body.phone != 'undefined') {
			unique_key = body.phone
		} else {
			unique_key = null;
		}
	}

	return unique_key;
}
module.exports.getUniqueKeyFromBody = getUniqueKeyFromBody;


const authUser = async function(body){//returns token
	knex('TB_SYS_USER_TABLE')
	.where('TB_SYS_USER_TABLE.user', body.user)
	// .and('TB_SYS_USER_TABLE.password', body.password)
    .then(user =>{
		console.log(user)
        return  user;
    });
	// let unique_key;
	// let auth_info = {};
	// auth_info.status = 'login';
	// unique_key = getUniqueKeyFromBody(userInfo);

	// if(!unique_key) TE('Ingrese un correo o un número de teléfono para ingresar');


	// if(!userInfo.password) TE('Ingrese una contraseña para ingresar');

	// let user;
	// if(validator.isEmail(unique_key)){
	// 	auth_info.method='email';

	// 	[err, user] = await to(User.findOne({email:unique_key }));
	// 	if(err) TE(err.message);

	// }else if(validator.isMobilePhone(unique_key, 'any')){//checks if only phone number was sent
	// 	auth_info.method='phone';

	// 	[err, user] = await to(User.findOne({phone:unique_key }));
	// 	if(err) TE(err.message);

	// }else{
	// 	TE('Correo o número de teléfono inválido');
	// }

	// if(!user) TE('No registrado');

	// [err, user] = await to(user.comparePassword(userInfo.password));

	// if(err) TE(err.message="Contraseña incorrecta");

	

}
module.exports.authUser = authUser;


const roleAuthorization = function(roles){

    return function(req, res, next){

        var user = req.user;

        User.findById(user._id, function(err, foundUser){

            if(err){
                res.status(422).json({message: 'Usuario no encontrado.'});
                return next(err);
            }

            if(roles.indexOf(foundUser.role) > -1){
                return next();
            }

            res.status(401).json({message: 'No autorizado'});
            return next('No Autorizado');

        });

    }

}

module.exports.roleAuthorization = roleAuthorization