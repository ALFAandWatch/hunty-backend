import { AppDataSource } from '../data-source';
import { categoriesSeedData } from '../data/categories-data';
import { Category } from '../entities/Category';

export async function seedCategoriesIfEmpty() {
   const categoryRepo = AppDataSource.getRepository(Category);
   const count = await categoryRepo.count();

   if (count > 0) {
      console.log('✅ Categorías ya existen, seeder omitido.');
      return;
   }

   for (const parentData of categoriesSeedData) {
      const parent = categoryRepo.create({
         name: parentData.name,
         iconUrl: parentData.iconUrl,
         parent: null,
      });

      await categoryRepo.save(parent);

      if (parentData.children?.length) {
         for (const child of parentData.children) {
            const childCategory = categoryRepo.create({
               name: child.name,
               parent,
            });
            await categoryRepo.save(childCategory);
         }
      }
   }

   console.log('✅ Categorías insertadas con éxito');
}
