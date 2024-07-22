import { Entity, PrimaryGeneratedColumn, Unique, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { MinLength, IsNotEmpty, IsEmail, MaxLength, IsBoolean, IsDate, IsDateString, IsOptional } from 'class-validator';
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['username'])
export class Usuarios {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MinLength(6)
  @MaxLength(50)
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @Column()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @Column()
  @IsNotEmpty()
  role: string;

  @Column()
  @IsOptional()
  @IsNotEmpty()
  resetToken: string;
  
  @Column()
  @IsOptional()
  @IsNotEmpty()
  refreshToken: string;

  @Column()
  @IsNotEmpty()
  estado: boolean; 

  hashPassword(): void {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }

  checkPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }

}
