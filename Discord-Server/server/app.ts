// src/server.ts
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { error } from 'console';
import { LoginPageServer } from './LoginPageServer';
import { mainPageServer} from './MainPageServer';

const app = express();
const PORT = 3200;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

/*app.use(bodyParser.json());
app.use(cors());
app.use("/login", loginPageServer);
app.use("/uploadPost", mainPageServer); */

app.use("/login", LoginPageServer);
app.use("/main", mainPageServer);  

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});