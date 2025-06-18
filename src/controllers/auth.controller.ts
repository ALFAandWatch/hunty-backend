import { Request, Response } from 'express';
import {
   registerUserService,
   registerEmpresaService,
   loginEmpresaService,
   loginUserService,
} from '../services/auth.service';

import { generateToken } from '../utils/jwt';

import { Usuario } from '../entities/Usuario';
import { Empresa } from '../entities/EmpresaUsuario';

/********************** REGISTER USER *********************************/
export const registerUserController = async (req: Request, res: Response) => {
   const { email, password } = req.body;

   try {
      const result = await registerUserService(email, password);
      res.status(201).json(result);
      return;
   } catch (error: any) {
      res.status(400).json({ message: error.message });
      return;
   }
};

/********************** REGISTER EMPRESA *********************************/
export const registerEmpresaController = async (
   req: Request,
   res: Response
) => {
   const { email, password } = req.body;

   try {
      const result = await registerEmpresaService(email, password);
      res.status(201).json(result);
   } catch (error: any) {
      res.status(400).json({ message: error.message });
   }
};

/********************** LOGIN  *********************************/
export const loginController = async (req: Request, res: Response) => {
   const { email, password } = req.body;

   try {
      // Intenta login como usuario
      const usuario: Usuario = await loginUserService(email, password);
      const token = generateToken({
         id: usuario.id,
         email: usuario.email,
         role: 'usuario',
      });
      res.status(200).json({ message: 'Login exitoso!', usuario, token });
      return;
   } catch (_) {
      // Si no es usuario, intenta como empresa
      try {
         const empresa: Empresa = await loginEmpresaService(email, password);
         const token = generateToken({
            id: empresa.id,
            email: empresa.email,
            role: 'empresa',
         });
         res.status(200).json({ message: 'Login exitoso!', empresa, token });
         return;
      } catch (error: any) {
         res.status(401).json({
            message: error.message || 'Credenciales inválidas',
         });
         return;
      }
   }
};
