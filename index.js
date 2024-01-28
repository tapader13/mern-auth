import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDb from './config/db.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

//connect mongo
connectDb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//api
import userAPI from './routes/userRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

app.use('/api/users', userAPI);

//default api
app.get('/', (req, res) => {
  res.send('server is ready');
});

//not found route
app.use(notFound);

//custom error handle
app.use(errorHandler);

//server listen
app.listen(port, () => console.log(`server start port on ${port}`));
