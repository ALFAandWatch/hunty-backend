import { Request, Response } from 'express';
import { listarUsuariosService } from '../services/usuarios.service';

export const listarUsuariosController = async (req: Request, res: Response) => {
   try {
      const users = await listarUsuariosService();
      res.status(200).json(users);
      return;
   } catch (error: any) {
      console.error('Error listando usuarios:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
      return;
   }
};
