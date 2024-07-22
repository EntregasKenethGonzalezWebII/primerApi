import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Productos } from "./entity/Productos"
import { Categoria } from "./entity/Categoria"
import { Usuarios } from "./entity/Usuarios"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Utn123**",
    database: "ejemplodb",
    synchronize: true,
    logging: false,
    entities: [User, Productos, Categoria, Usuarios],
    migrations: [],
    subscribers: [],
})
