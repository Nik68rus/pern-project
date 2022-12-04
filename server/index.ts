import express from 'express';
import dotenv from 'dotenv';
import sequelize from './db';
import * as models from './models/models';
import cors from 'cors';
import router from './routes';
import errorHandler from './middleware/errorHandlerMiddleware';
import fileUpload from 'express-fileupload';
import path from 'path';

dotenv.config();

let PORT = +(process.env.PORT as string);

if (isNaN(PORT)) {
  PORT = 8080;
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);

// Must be last one!!!
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
// console.log(models);

start();
