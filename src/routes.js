import { Router } from "express"
import multer from "multer"
import multerConfig from "./config/multer"
import authMiddleware from "./app/middlewares/auth"

import SessionController from "./app/controllers/SessionController"
import UserController from "./app/controllers/UserController"
import multerConfig from "./config/multer"
// import PeopleVisitController from "./app/controllers/VisitsController"
import StatusController from "./app/controllers/StatusController"
import VisitsController from "./app/controllers/VisitsController"
import RegisterVisitsController from "./app/controllers/RegisterVisitsController"
const routes = new Router()
const upload = multer(multerConfig)

// routes.get("/visits", PeopleVisitController.index)
// routes.get("/categories", CategoryController.index)
/*
ROTA PARA CRIAÇÃO DE USUÁRIOS
*/
routes.get("/users", UserController.index)
routes.post("/users", UserController.store)

/*
 ROTA PARA REALIZAR O LOGIN
*/
routes.post("/sessions", SessionController.store)

/*
AUTENTICAÇÃO COM JWT (TODAS AS ROTAS EMBAIXO DEPENDE DESSA AUTENTICAÇÃO)
*/
routes.use(authMiddleware)

/*
ROTAS DOS PRODUTOS
*/
routes.get("/visits", VisitsController.index)
routes.post("/visits", upload.single("file"), VisitsController.store)
routes.put("/visits/:id", upload.single("file"), VisitsController.update)
routes.delete(
  "/visits/:id",
  upload.single("file"),
  VisitsController.delete
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
routes.post("/visits-registers/:id", RegisterVisitsController.store)
routes.put("/visits-registers/:id", RegisterVisitsController.update)
routes.get("/visits-registers", RegisterVisitsController.index)
routes.delete("/visits-registers/:id", RegisterVisitsController.delete)

routes.get("/visits-status", StatusController.index)
routes.put("/visits-status/:id", StatusController.update)
routes.delete("/visits-status/:id", StatusController.delete)

export default routes
