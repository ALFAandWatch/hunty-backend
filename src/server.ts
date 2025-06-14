import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import router from './routes';
import morgan from 'morgan';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use(router);

export default app;
