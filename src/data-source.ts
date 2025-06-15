// src/data-source.ts

import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Empresa } from './entities/Empresa';
import { Usuario } from './entities/Usuario';
import { Category } from './entities/Category';

export const AppDataSource = new DataSource({
   type: 'postgres',
   host: process.env.DB_HOST || 'localhost',
   port: Number(process.env.DB_PORT) || 5432,
   username: process.env.DB_USERNAME || 'tu_usuario',
   password: process.env.DB_PASSWORD || 'tu_password',
   database: process.env.DB_NAME || 'tu_basedatos',
   synchronize: true,
   logging: false,
   entities: [Empresa, Usuario, Category],
   migrations: [],
   subscribers: [],
});
