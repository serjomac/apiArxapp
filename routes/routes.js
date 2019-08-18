require('./global_functions');  //instantiate global functions
const express = require('express');
const route= express.Router();
const passport			= require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});
// const path				= require('path');

const PLUController	= require('../controllers/PLUController');
const UserController	= require('./../controllers/UserController');
const MesaController	= require('./../controllers/MesaController');
const ComandaController	= require('./../controllers/ComandaController');
const ClientController	= require('./../controllers/ClientController');
const AccountController	= require('./../controllers/AccountController');

/*GET home page.*/
    module.exports = (socketAPI) => {
	route.get('/', function(req, res, next) {
      res.json({status:"success", message:"Parcel Pending API", data:{"version_number":"v1.0.0"}})
      res.socketAPI = socketAPI;
		next();
	});
console.log("ksl");

route.post("/plu", PLUController.read);
route.post("/login", UserController.login);
route.post("/mesa", MesaController.read);
route.get("/mesa", MesaController.read);
route.post("/mesa/id", MesaController.mesaById);
route.post("/comanda/create", ComandaController.create);
 route.post("/comanda/idMesa", ComandaController.getByMesa);
 route.post("/comanda/update", ComandaController.update);
 route.post("/comanda/updateEstado", ComandaController.updateEstado);

 route.post("/cliente/cedula", ClientController.getByCedula);
 route.post("/cliente/create", ClientController.create);
// route.post("/transfer", TransferController.transfer);
// route.post("/transfer/create", TransferController.create);
// route.post("/transfer/user", TransferController.read);
// route.post("/account", AccountController.readByUser);
return route;
}