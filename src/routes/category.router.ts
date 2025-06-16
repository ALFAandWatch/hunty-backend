import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';

const categoryRouter = Router();

categoryRouter.get('/groups', CategoryController.getCategoryTree);
categoryRouter.get('/search', CategoryController.searchCategories);
categoryRouter.get('/:id', CategoryController.getCategoryById);

export default categoryRouter;
