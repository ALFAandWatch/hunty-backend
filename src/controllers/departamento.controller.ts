import { Request, Response } from 'express';
import { DepartamentoService } from '../services/departamento.service';

const departamentoService = new DepartamentoService();

export class DepartamentoController {
   static async searchDepartamentos(req: Request, res: Response) {
      try {
         const query = req.query.q as string;

         if (!query || query.trim() === '') {
            res.status(400).json({
               message: 'El parámetro de búsqueda "q" es requerido',
            });
            return;
         }

         const departamentos = await departamentoService.searchDepartamentos(
            query
         );
         res.status(200).json(departamentos);
         return;
      } catch (error) {
         console.error('Error al buscar departamentos:', error);
         res.status(500).json({ message: 'Error interno del servidor' });
         return;
      }
   }

   static async getDepartamentoById(req: Request, res: Response) {
      const { id } = req.params;

      try {
         const departamento = await departamentoService.getDepartamentoById(id);

         if (!departamento) {
            res.status(404).json({ message: 'Departamento no encontrado' });
            return;
         }

         res.status(200).json(departamento);
         return;
      } catch (error) {
         console.error('Error al obtener departamento por ID:', error);
         res.status(500).json({ message: 'Error interno del servidor' });
         return;
      }
   }
}
