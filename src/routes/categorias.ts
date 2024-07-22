import { Router } from "express";
import CategoriasController from "../controller/CategoriasController";

const routes= Router();

routes.get("", CategoriasController.getAll)
routes.get("/getOne/:id", CategoriasController.getOne)
/*
routes.post("", ProductosController.create)
routes.put("/:id", ProductosController.update)
routes.delete("/:id", ProductosController.delete)
*/

export default routes;