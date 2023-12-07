"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multer3 = require('./config/multer'); var _multer4 = _interopRequireDefault(_multer3);
var _auth = require('./app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

var _SessionController = require('./app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
var _UserController = require('./app/controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);

// import PeopleVisitController from "./app/controllers/VisitsController"
var _StatusController = require('./app/controllers/StatusController'); var _StatusController2 = _interopRequireDefault(_StatusController);
var _VisitsController = require('./app/controllers/VisitsController'); var _VisitsController2 = _interopRequireDefault(_VisitsController);
var _RegisterVisitsController = require('./app/controllers/RegisterVisitsController'); var _RegisterVisitsController2 = _interopRequireDefault(_RegisterVisitsController);
const routes = new (0, _express.Router)()
const upload = _multer2.default.call(void 0, _multer4.default)

// routes.get("/visits", PeopleVisitController.index)
// routes.get("/categories", CategoryController.index)
/*
ROTA PARA CRIAÇÃO DE USUÁRIOS
*/
routes.get("/users", _UserController2.default.index)
routes.post("/users", _UserController2.default.store)
routes.put("/users/:id", _UserController2.default.update)
routes.delete("/users/:id", _UserController2.default.delete)

/*
 ROTA PARA REALIZAR O LOGIN
*/
routes.post("/sessions", _SessionController2.default.store)

/*
AUTENTICAÇÃO COM JWT (TODAS AS ROTAS EMBAIXO DEPENDE DESSA AUTENTICAÇÃO)
*/
routes.use(_auth2.default)

/*
ROTAS DOS PRODUTOS
*/
routes.get("/visits", _VisitsController2.default.index)
routes.post("/visits", upload.single("file"), _VisitsController2.default.store)
routes.put("/visits/:id", upload.single("file"), _VisitsController2.default.update)
routes.delete(
  "/visits/:id",
  upload.single("file"),
  _VisitsController2.default.delete
)

/*
ROTAS DAS CATEGORIAS
*/
// routes.post("/categories", upload.single("file"), CategoryController.store)
// routes.get("/categories", CategoryController.index)
// routes.put("/categories/:id", upload.single("file"), CategoryController.update)

/* 
ROTAS DOS REGISTROS DAS VISITAS
*/
routes.get("/visits-registers", _RegisterVisitsController2.default.index)
routes.delete("/visits-registers/:id", _RegisterVisitsController2.default.delete)
routes.post("/visits-registers/:id", _RegisterVisitsController2.default.store)
routes.put("/visits-registers/:id", _RegisterVisitsController2.default.update)

routes.get("/visits-status", _StatusController2.default.index)
routes.put("/visits-status/:id", _StatusController2.default.update)
routes.delete("/visits-status/:id", _StatusController2.default.delete)

exports. default = routes
