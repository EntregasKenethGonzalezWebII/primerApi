import { Request, Response } from "express";

class ProductosController{
    static getAll = async(req: Request, resp: Response) => {

        return resp.status(200).json("Todo bien en get all")
    }

    static create = async(req: Request, resp: Response) => {
        
        return resp.status(200).json("Todo bien en create")
    }
}

export default ProductosController;