import { Router } from "express";

import { getAllKendaraan, postKendaraan } from "../controllers/kendaraan";

const router = Router();

router.get("/kendaraan", getAllKendaraan);
router.post("/kendaraan/tambah", postKendaraan);

export default router;
