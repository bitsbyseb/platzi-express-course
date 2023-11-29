import express from 'express';
import ProductService from '../services/product.service.js';
import { validatorHandler } from '../middlewares/validator.handler.js';
import {
  createProductSchema,
  getProductSchema,
  updateProductSchema,
} from '../schemas/product.schema.js';

const Router = express.Router();
const service = new ProductService();

Router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

Router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const objFinded = await service.findOne(id);
      res.json(objFinded);
    } catch (error) {
      next(error);
    }
  },
);

Router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  },
);

Router.patch(
  '/:id',
  validatorHandler(getProductSchema,'params'),
  validatorHandler(updateProductSchema,'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  },
);

Router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const producDeleted = await service.delete(id);
  res.status(200).json(producDeleted);
  async;
});

export default Router;
