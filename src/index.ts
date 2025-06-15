import 'dotenv/config';
import app from './server';
import { AppDataSource } from './data-source';
import { Category } from './entities/Category';
import { categoriesSeedData } from './data/categories-data';

const port = process.env.PORT || 3000;

const seedCategoriesIfEmpty = async () => {
   const categoryRepo = AppDataSource.getRepository(Category);
   const count = await categoryRepo.count();

   if (count === 0) {
      console.log('📦 Tabla "category" vacía. Ejecutando seeder...');
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
      console.log('✅ Categorías seed insertadas con éxito');
   } else {
      console.log('✅ Tabla "category" ya contiene datos. Seeder omitido.');
   }
};

const initialize = async () => {
   try {
      await AppDataSource.initialize();
      console.log('Database connection established successfully');

      await seedCategoriesIfEmpty();

      app.listen(port, () => {
         console.log(`Server is running on http://localhost:${port}`);
      });
   } catch (err) {
      console.log('Error initializing the server:', err);
   }
};

initialize();
