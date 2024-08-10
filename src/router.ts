import { Router } from 'express';
import { body, oneOf, validationResult } from 'express-validator';

import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from './handlers/product';
import {
  createUpdate,
  deleteUpdate,
  getAllUpdates,
  getOneUpdate,
  updateUpdate,
} from './handlers/updates';
import { handleInputErrors } from './modules/middleware';

const router:Router = Router();

/**
 * product
 */

router.get('/product', getProducts);

router.get('/product/:id', getOneProduct);

router.put(
  '/product/:id',
  body('name').isString(),
  handleInputErrors,
  updateProduct
);

router.post(
  '/product',
  body('name').isString(),
  handleInputErrors,
  createProduct
);

router.delete('/product/:id', deleteProduct);

/**
 * update
 */

router.get('/update', getAllUpdates);
router.get('/update/:id', getOneUpdate);

// body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
router.put(
  '/update/:id',
  body('title').optional(),
  body('body').optional(),
  body('status')
    .isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED'])
    .withMessage('invalid status value'),
  body('version').optional(),
  updateUpdate
);

router.post(
  '/update',
  body('title').exists().withMessage('input a title').isString(),
  body('body', { message: 'please input a body' })
    .exists()
    .isString()
    .isLength({ min: 10, max: 50 }),
  body('productId').exists().isString(),
  createUpdate
);

router.delete('/update/:id', deleteUpdate);

/**
 * update Point
 */

router.get('/updatepoint', () => {});
router.get('/updatepoint/:id', () => {});

router.put(
  '/updatepoint/:id',
  body('name').optional().isString(),
  body('description').optional().isString(),
  () => {}
);

router.post(
  '/updatepoint',
  body('name').isString(),
  body('description').isString(),
  body('updateId').exists().isString(),
  () => {}
);

router.delete('/updatepoint/:id', () => {});

export default router;
