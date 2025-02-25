import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import Connection from './database/db.js';
 
import Routes from './routes/route.js';

import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 



const app=express();

app.use(express.static(path.join(__dirname,'/client/dist')))

app.get('*',(req,res) => res.sendFile(path.join(__dirname,'/client/dist/index.html')))


app.use(cors());

app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}))

app.use('/',Routes);

const PORT=8000;
Connection();

app.listen(PORT,() => console.log(`Your server is runing successfully on PORT ${PORT}`));