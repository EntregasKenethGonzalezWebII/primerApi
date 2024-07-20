import { Request, Response } from "express";
import { Productos } from "../entity/Productos";
import { AppDataSource } from "../data-source";

class ProductosController{

    static getAll= async(req: Request, resp: Response)=>{

        try {
            const repo = AppDataSource.getRepository(Productos);
            const listaProductos = await repo.find();
            
            if ((listaProductos).length == 0){
                return resp.status(404).json({message: "No hay datos registrados"});
            }
            return resp.status(200).json(listaProductos)
            
        } catch (error) {
            return resp.status(404).json({message: "Error al acceder a la base de datos"});
        }

    }

    static create= async(req: Request, resp: Response)=>{

        const repoProductos = AppDataSource.getRepository(Productos);

        try {
            const {id, nombre, precio, stock, categoria} = req.body;

            if (!id){
                return resp.status(400).json({mensaje: "Debe indicar el ID del producto"});
            }
            if (!nombre){
                return resp.status(400).json({mensaje: "Debe indicar el nombre del producto"});
            }
            if (!precio){
                return resp.status(400).json({mensaje: "Debe indicar el precio del producto"});
            }
            if (!stock){
                return resp.status(400).json({mensaje: "Debe indicar el stock del producto"});
            }
            if (!categoria){
                return resp.status(400).json({mensaje: "Debe indicar la categoria del producto"});
            }

            let product = await repoProductos.findOne({where:{id}});

            if (product){
                return resp.status(400).json({message: "El producto ya esta registrado"});
            }
            if (stock <= 0){
                return resp.status(400).json({message: "El stock debe ser mayor a 0"});
            }
            
            product = new Productos;

            product.id = id;
            product.nombre = nombre;
            product.precio = precio;
            product.stock = stock;
            product.categoria = categoria;
            product.estado = true;

            await repoProductos.create(product);
            repoProductos.save(product);
            
        } catch (error) {
            return resp.status(400).json({message: "Error al guardar"})
        }
        return resp.status(200).json({message: "Producto guardado correctamente"})
    }

    static getOne= async(req: Request, resp: Response)=>{

        try {
            const id = parseInt(req.params['id']);

            if (!id){
                return resp.status(400).json({message: "Debe indicar el id"});
            }

            const repo = AppDataSource.getRepository(Productos);

            try {
                const producto = await repo.findOneOrFail({where:{id}});
                return resp.status(200).json(producto);

            } catch (error) {
                return resp.status(404).json({message: `No existe el producto con el id ${id}`});
                
            }  
        } catch (error) {
            
        }

    }
}

export default ProductosController; 