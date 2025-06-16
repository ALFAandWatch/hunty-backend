import { AppDataSource } from '../data-source';
import { Category } from '../entities/Category';
import { IsNull } from 'typeorm';
import { ILike } from 'typeorm';

export class CategoryService {
   private categoryRepository = AppDataSource.getRepository(Category);

   // Traer categorías en árbol: padres con hijas
   async getCategoryTree(): Promise<Category[]> {
      const categories = await this.categoryRepository.find({
         where: { parent: IsNull() },
         relations: ['children'],
         order: { name: 'ASC', children: { name: 'ASC' } },
      });

      return categories;
   }

   // Traer categorías segun búsqueda
   async searchCategories(query: string): Promise<Category[]> {
      return this.categoryRepository.find({
         where: { name: ILike(`%${query}%`) },
         order: { name: 'ASC' },
         relations: ['parent'],
      });
   }

   async getCategoryById(id: string): Promise<Category | null> {
      const category = await this.categoryRepository.findOne({
         where: { id },
      });

      return category;
   }
}
