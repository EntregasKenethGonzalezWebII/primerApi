import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Usuarios } from "../entity/Usuarios";
import { validate } from "class-validator";

export class UsuariosController {

  static new = async (req: Request, res: Response) => {
    const {
      username,
      password,
      role
    } = req.body;
    const user = new Usuarios();

    user.username = username;
    user.password = password;
    user.role = role;
    user.estado = true;

    user.resetToken = "new";
    user.refreshToken = "new";

    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(user, validationOpt);
    if (errors.length > 0) {
      console.log(errors);
      return res.status(400).json(errors);
    }

    const userRepository = AppDataSource.getRepository(Usuarios);
    try {
      //hash password
      user.hashPassword();
      await userRepository.save(user);
    } catch (e) {
      console.log(e);
      return res
        .status(409)
        .json({ message: "El nombre de usuario ya existe." });
    }
    // All ok
    res.status(201).send("Usuario Creado.");
  };
  
//   static getAll = async (req: Request, res: Response) => {
//     const userRepository = getRepository(Usuarios);
//     let users;

//     try {
//       users = await userRepository.find({
//         select: [
//           "id",
//           "username",
//           "role",
//           "estado",
//         ],
//         where: { estado: true },
//       });
//     } catch (e) {
//       res.status(404).json({ message: "Error: Algo no fue bien!" });
//     }

//     if (users.length > 0) {
//       res.send(users);
//     } else {
//       res.status(404).json({ message: "No hay resultados" });
//     }
//   };

//   static getById = async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const userRepository = getRepository(Usuarios);
//     try {
//       const user = await userRepository.findOneOrFail(id, {
//         select: [
//           "id",
//           "username",
//           "role",
//           "estado"
//         ],
//         where: { estado: true },
//       });
//       res.send(user);
//     } catch (e) {
//       return res.status(404).json({ message: "Usuario no encontrado." });
//     }
//   };

  // static edit = async (req: Request, res: Response) => {
  //   let user;
  //   const { id } = req.params;
  //   const {
  //     username,
  //     role,
  //     estado,
  //     password,
  //   } = req.body;

  //   const userRepository = getRepository(Usuarios);
  //   // Try get user
  //   try {
  //     user = await userRepository.findOneOrFail(id);
  //     user.username = username;
  //     user.role = role;
  //     user.password = password;
  //     user.estado = estado;
  //   } catch (e) {
  //     return res.status(404).json({ message: "Usuario no encontrado." });
  //   }
  //   const validationOpt = { validationError: { target: false, value: false } };
  //   const errors = await validate(user, validationOpt);

  //   if (errors.length > 0) {
  //     return res.status(400).json(errors);
  //   }

  //   // Try to save user
  //   try {
  //     user.hashPassword();
  //     await userRepository.save(user);
  //   } catch (e) {
  //     return res
  //       .status(409)
  //       .json({ message: "Nombre de usuario se encuentra en uso." });
  //   }

  //   res.status(201).json({ message: "Usuario Actualizado." });
  // };

  // static delete = async (req: Request, res: Response) => {
  //   const { id } = req.params;
  //   const userRepository = getRepository(Usuarios);
  //   let user: Usuarios;

  //   try {
  //     user = await userRepository.findOneOrFail(id);
  //   } catch (e) {
  //     return res.status(404).json({ message: "Usuario no encontrado." });
  //   }

  //   // Remove user

  //   user.estado = false;

  //   try {
  //     await userRepository.save(user);
  //   } catch (e) {
  //     return res
  //       .status(409)
  //       .json({ message: "Nombre de usuario se encuentra en uso." });
  //   }

  //   res.status(201).json({ message: "Usuario eliminado." });
  // };
}

export default UsuariosController;
