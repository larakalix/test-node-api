import { Router } from 'express';
import * as ctrl from '../controllers/product.controller';

const router = Router();

router.get('/', ctrl.getProducts);

router.get('/:id', ctrl.getProductById);

router.post('/', ctrl.createProduct);

router.put('/:id', ctrl.updateProductById);

router.delete('/:id', ctrl.deleteProductById);

export default router;