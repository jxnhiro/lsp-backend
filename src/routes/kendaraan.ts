import { Router } from 'express';
import multer from 'multer';
import {
  deleteKendaraan,
  getAllKendaraan,
  postKendaraan,
  putKendaraan,
} from '../controllers/kendaraan';

const router = Router();

router.get('/kendaraan', getAllKendaraan);
router.post('/kendaraan/tambah', postKendaraan);
router.put('/kendaraan/ubah/:kendaraanId', putKendaraan);
router.delete('/kendaraan/hapus/:kendaraanId', deleteKendaraan);

export default router;
