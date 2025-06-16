import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import router from './routes';
import morgan from 'morgan';

const app = express();

app.use(helmet());
app.use(
   cors({
      origin: 'http://localhost:3001',
      credentials: true, // si usás cookies o headers personalizados
   })
);
app.use(express.json());
app.use(morgan('dev'));

app.use(router);

export default app;
