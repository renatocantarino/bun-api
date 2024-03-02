import express from 'express';
import { UserController } from './controllers/userController';

const app = express();
const port = 3000;

app.get('/users', UserController);

app.listen(port, () => {
  console.log(`Servers running in port ${port}`);
});
