import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';


import Connection from './database/db.js';
 
import Routes from './routes/route.js';

import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 



const app=express();

const allowedOrigins = [
  'https://mern-todo-iljn.onrender.com'
];


app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}))

app.use('/',Routes);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname,'/client/dist')));
}
app.use('*',(req,res) => {
 res.sendFile(path.join(__dirname,'/client/dist/index.html'));
});

const PORT = process.env.PORT || 8001;

app.listen(PORT,() => console.log(`Your server is runing successfully on PORT ${PORT}`));

const USERNAME=process.env.DB_USERNAME;    
const PASSWORD=process.env.DB_PASSWORD;

const URL=process.env.MONGODB_URI || `mongodb+srv://${USERNAME}:${PASSWORD}@mern-todo.qnc63.mongodb.net/?retryWrites=true&w=majority`;
Connection(URL);
