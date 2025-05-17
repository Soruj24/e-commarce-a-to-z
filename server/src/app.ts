const express = require('express');
import { Request, Response } from 'express';

const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (request: Request, response: Response) => {
    response.send('Hello World!');
}
);


export default app;

