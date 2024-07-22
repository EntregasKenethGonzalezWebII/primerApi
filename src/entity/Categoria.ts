import { IsNotEmpty, IsNumber, MaxLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Productos } from "./Productos";

@Entity()
export class Categoria{
 
    @PrimaryGeneratedColumn()
    @IsNotEmpty({message:'Debe indicar el ID.'})  
    id:number;

    @Column({length:50,nullable:false})
    @MaxLength(50,{message:'Debe contener un máximo de 50 caracteres.'})
    @IsNotEmpty({message:'Debe indicar el nombre de la categoria.'})
    nombre: string  

    @Column({length:500,nullable:false})
    @MaxLength(500,{message:'Debe contener un máximo de 500 caracteres.'})
    @IsNotEmpty({message:'Debe indicar la descripcion de la categoria.'})
    descripcion: string  
   
    @Column()
    @IsNotEmpty({message:'Debe indicar el estado.'})     
    @Column({default:1})
    estado: boolean;

    @OneToMany(()=> Productos, (productos)=> productos.categoria )
    Productos:Productos[]
    
}