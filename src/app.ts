import express from "express";
import cors from "cors";

import kendaraanRouter from "./routes/kendaraan";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(kendaraanRouter);
app.listen(8000);
