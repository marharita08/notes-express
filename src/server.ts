import express, {Express} from 'express';

import NotesRoute from "./routes/NotesRoute";
import CategoriesRoute from "./routes/CategoriesRoute";
import errorHandler from "./middleware/ErrorHandler";
import bodyParser from "body-parser";
require('dotenv').config();
const cors = require('cors');

const app: Express = express();
const hostPort: number = Number(process.env.APP_HOST_PORT);
const containerPort: number = Number(process.env.APP_CONTAINER_PORT);

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/notes", NotesRoute);
app.use("/categories", CategoriesRoute);
app.use(errorHandler);

app.listen(containerPort, ()=> {
    console.log(`[Server]: I am running at http://localhost:${hostPort}`);
});
