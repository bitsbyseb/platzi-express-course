import productsRouter from './productsRouter.js';
import usersRouter from './usersRouter.js';
import express from 'express';
import musicRouter from './musicRouter.js';

const rootPath = '/api/v1';

function routerApi(app) {
  const Router = express.Router();
  app.use(rootPath,Router);
  Router.use('/products',productsRouter);
  Router.use('/users',usersRouter);
  Router.use('/music',musicRouter);
}

export {
  routerApi
}
