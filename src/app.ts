import express from 'express';
import cors from 'cors';
import kendaraanRouter from './routes/kendaraan';
import pesananRouter from './routes/pesanan';
import customerRouter from './routes/customer';
import multer from 'multer';
import path from 'path';
import fileUpload from 'express-fileupload';
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));
app.use(kendaraanRouter);
app.use(pesananRouter);
app.use(customerRouter);
app.listen(8000);
