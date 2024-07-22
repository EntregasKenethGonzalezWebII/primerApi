import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Usuarios } from "../entity/Usuarios";
import * as bycript from "bcryptjs";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

class AuthController {

    static login = async (req: Request, res: Response) => {
        let usuario = new Usuarios();
        try {
            const {username, password} = req.body;

            if(!(username || password)){
                return res.status(400).json({message : "Falta un usuario o contraseña "})
            }

            const repoUsuario = AppDataSource.getRepository(Usuarios);

            try {
                usuario = await repoUsuario.findOneOrFail({where:{username}})
            } catch (error) {
                return res.status(400).json({message : "Usuario o contraseña incorrecta "})
            }
            
            if(!bycript.compare(password, usuario.password)){
                return res.status(400).json({message : "Usuario o contraseña incorrecta "})
            }

            const token = jwt.sign({id:usuario.id},config.jwtSecret,{expiresIn:'10m'})

            return res.status(200).json({message:"OK", token, username, role:usuario.role, usuario:usuario.username})

        } catch (error) {
            return res.status(400).json({message : "Error de logueo "})
        }

    }

}

export default AuthController;