import { Router } from "express";
import ProductosController from "../controller/ProductosController";
import { checkJwt } from "../middleware/jwt";
import { checkRole } from "../middleware/role";

const routes= Router();

routes.get("", ProductosController.getAll)
routes.get("/getOne/:id", ProductosController.getOne)
routes.post("", ProductosController.create)
routes.put("/:id", ProductosController.update)
routes.delete("/:id", ProductosController.delete)


export default routes;

