import 'dotenv/config';
import app from './server';
import { AppDataSource } from './data-source';
import { seedDepartamentosIfEmpty } from './seed/seed-departamentos';
import { seedEmpresasIfEmpty } from './seed/seed-empresas';
import { seedCategoriesIfEmpty } from './seed/seed-categories';

const port = process.env.PORT || 3000;

const initialize = async () => {
   try {
      await AppDataSource.initialize();
      console.log('Database connection established successfully');

      await seedCategoriesIfEmpty();
      await seedDepartamentosIfEmpty();
      await seedEmpresasIfEmpty();

      app.listen(port, () => {
         console.log(`Server is running on http://localhost:${port}`);
      });
   } catch (err) {
      console.log('Error initializing the server:', err);
   }
};

initialize();
