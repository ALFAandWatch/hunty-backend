import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Usuario } from './entities/Usuario';
import { Category } from './entities/Category';
import { Departamento } from './entities/Departamento';
import { EmpresaPerfil } from './entities/Empresa';
import { EmpresaUsuario } from './entities/EmpresaUsuario';

export const AppDataSource = new DataSource({
   type: 'postgres',
   host: process.env.DB_HOST || 'localhost',
   port: Number(process.env.DB_PORT) || 5432,
   username: process.env.DB_USERNAME || 'tu_usuario',
   password: process.env.DB_PASSWORD || 'tu_password',
   database: process.env.DB_NAME || 'tu_basedatos',
   synchronize: true,
   dropSchema: false,
   logging: false,
   entities: [EmpresaUsuario, Usuario, Category, Departamento, EmpresaPerfil],
   migrations: [],
   subscribers: [],
});
