import { AppDataSource } from '../data-source'; // importa tu DataSource
import { categoriesSeedData } from '../data/categories-data';
import { Category } from '../entities/Category';

async function seedCategories() {
   await AppDataSource.initialize();
   const categoryRepo = AppDataSource.getRepository(Category);

   for (const parentData of categoriesSeedData) {
      const parent = categoryRepo.create({
         name: parentData.name,
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
   await AppDataSource.destroy();
}

seedCategories().catch((e) => {
   console.error('❌ Error al insertar categorías:', e);
   process.exit(1);
});
