const express = require('express');
import { Request, Response } from 'express';
import seedUserRouter from './routes/seedUserRouter';

const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seedUserRouter )


export default app;

