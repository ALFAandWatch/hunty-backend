import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service';

const categoryService = new CategoryService();

export class CategoryController {
   static async getCategoryTree(req: Request, res: Response) {
      try {
         const categories = await categoryService.getCategoryTree();
         res.status(200).json(categories);
         return;
      } catch (error) {
         console.error('Error al obtener categorías:', error);
         res.status(500).json({ message: 'Error interno del servidor' });
         return;
      }
   }

   static async searchCategories(req: Request, res: Response) {
      try {
         const query = req.query.q as string;

         if (!query) {
            res.status(400).json({
               message: 'Parámetro de búsqueda "q" es requerido',
            });
            return;
         }

         const results = await categoryService.searchCategories(query);
         res.status(200).json(results);
      } catch (error) {
         console.error('Error al buscar categorías:', error);
         res.status(500).json({ message: 'Error interno del servidor' });
      }
   }
}
