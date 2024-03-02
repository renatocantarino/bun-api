import express from 'express';
import {
  CreateUserController,
  FindUserByIdController,
  UserController,
} from './controllers/userController';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/users', UserController);
app.get('/users/:UserId', FindUserByIdController);
app.post('/users', CreateUserController);

app.listen(port, () => {
  console.log(`Servers running in port ${port}`);
});
