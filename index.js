require('./global_functions');  //instantiate global functions

let express = require('express')
let app = express();
const cors = require('cors');
var route= express.Router()
const bodyParser 	= require('body-parser');
let http = require('http');
let server = http.Server(app);

let socketIO = require('./bin/socketApi')(server);
console.log("socket index")

// let io = socketIO(server);
app.use(cors({origin: '*'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3004;
route.get("/", function(req,res,next){
  res.json({status:"succes", message:"Parcel Pending Api"})
})
const PLUController	= require('./controllers/PLUController');
const NotificacionesController	= require('./controllers/notificaciones');
const MesaController	= require('./controllers/MesaController');
const ComandaController	= require('./controllers/ComandaController');
const ClientController	= require('./controllers/ClientController');

app.use(route);
route.post("/plu", PLUController.read);


route.post("/mesa", MesaController.read);
route.get("/mesa", MesaController.read);
route.post("/mesa/id", MesaController.mesaById);
route.post("/factura/id", MesaController.mesaFactura);
route.post("/notificaciones/create",(req,res,next) => {
  
  res.socketApi=socketIO;
  next()
}, NotificacionesController.postNotificaciones);


route.post("/comanda/create", (req,res,next) => {
  
  res.socketApi=socketIO;
  next()
}, ComandaController.create);

route.post("/comanda/getPedidosByComanda", ComandaController.getPedidosByComanda);
 route.post("/comanda/idMesa", ComandaController.getByMesa);
 route.post("/comanda/updatePedido" ,ComandaController.pedidoUpdate);
 route.post("/comanda/update" ,ComandaController.update);
 route.post("/comanda/updateEstado",(req,res,next) => {
  
  res.socketApi=socketIO;
  next()
}, ComandaController.updateEstado);

 route.post("/cliente/cedula", ClientController.getByCedula);
 route.post("/cliente/id", ClientController.getById);
 route.post("/cliente/create", ClientController.create);
 route.post("/cliente/getPluById", ClientController.getPluById);

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
