import 'dotenv/config';
import app from './server';
import { AppDataSource } from './data-source';

const port = process.env.PORT || 3000;

const initialize = async () => {
   AppDataSource.initialize()
      .then(() => {
         console.log('Database connection established successfully');
         app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
         });
      })
      .catch((err) => {
         console.log('Error initializing the server:', err);
      });
};

initialize();
