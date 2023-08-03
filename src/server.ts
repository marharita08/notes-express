import express, {Express} from 'express';

import NotesRoute from "./routes/NotesRoute";
import errorHandler from "./middleware/ErrorHandler";
import bodyParser from "body-parser";

const app: Express = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/notes", NotesRoute);
app.use(errorHandler);

app.listen(port, ()=> {
    console.log(`[Server]: I am running at https://localhost:${port}`);
});
