import { Router } from 'express';
import { addPesan, getAllPesananForUser } from '../controllers/pesanan';

const router = Router();

router.get('/pesanan/:customerId', getAllPesananForUser);
router.post('/pesanan/tambah', addPesan);
export default router;
