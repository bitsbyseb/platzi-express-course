import express from 'express';
import { routerApi } from './routes/index.js';
import {errorHandler,logErrors,boomErrorHandler} from './middlewares/errorHandler.js'
import cors from 'cors';

const app = express();
const port = 3000;
app.set()
app.use(express.json());

app.use(cors());
routerApi(app);
app.use(boomErrorHandler);
app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Running on https://localhost:${port}`);
});
