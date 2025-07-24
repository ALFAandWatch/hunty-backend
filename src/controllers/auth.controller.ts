import { Request, Response } from 'express';
import {
   registerUserService,
   registerEmpresaWithUsuarioService,
   createEmpresaService,
} from '../services/auth.service';

import { generateToken } from '../utils/jwt';

import { Usuario } from '../entities/Usuario';

/********************** REGISTER USER *********************************/
export const registerUserController = async (req: Request, res: Response) => {
   try {
      const { email, password, nombre, celular, role } = req.body;

      if (!email || !password || !nombre) {
         res.status(400).json({ message: 'Faltan campos obligatorios' });
         return;
      }

      const nuevoUsuario = await registerUserService({
         email,
         password,
         nombre,
         celular,
         role,
      });

      res.status(201).json({
         message: 'Usuario registrado con éxito',
         usuario: {
            id: nuevoUsuario.usuario.usuario.id,
            nombre: nuevoUsuario.usuario.usuario.nombre,
            celular: nuevoUsuario.usuario.usuario.celular,
            role: nuevoUsuario.usuario.usuario.role,
         },
      });
      return;
   } catch (error: any) {
      res.status(400).json({ message: error.message });
      return;
   }
};

/********************** REGISTER EMPRESA SIN USUSARIO *********************************/
export const registerEmpresaOnlyController = async (
   req: Request,
   res: Response
) => {
   const data = req.body;

   try {
      const result = await createEmpresaService(data);
      res.status(201).json(result);
   } catch (error: any) {
      res.status(400).json({ message: error.message });
   }
};

/********************** REGISTER EMPRESA SIN USUSARIO *********************************/
export const registerEmpresaWithUsuarioController = async (
   req: Request,
   res: Response
) => {
   try {
      const {
         nombreFantasia,
         plan,
         perfilEspecial,
         slugUrl,
         apellido,
         cedula,
         razonSocial,
         rut,
         email,
         password,
         nombre,
         celular,
         role,
      } = req.body;

      if (!email || !password || !nombre) {
         res.status(400).json({ message: 'Faltan campos obligatorios' });
         return;
      }

      const dataEmpresa = {
         nombreFantasia,
         plan,
         perfilEspecial,
         slugUrl,
         apellido,
         cedula,
         razonSocial,
         rut,
      };

      const userData = {
         email,
         password,
         nombre,
         celular,
         role,
      };

      const result = await registerEmpresaWithUsuarioService(
         dataEmpresa,
         userData
      );

      res.status(201).json({
         message: 'Empresa y usuario registrados con éxito',
         empresa: result.newEmpresa,
         usuario: result.newUsuario,
      });
   } catch (error: any) {
      res.status(400).json({ message: error.message });
   }
};
