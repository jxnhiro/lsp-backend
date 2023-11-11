import { Router } from 'express';
import {
  deleteCustomer,
  editCustomer,
  getAllCustomers,
} from '../controllers/customer';

const router = Router();

router.get('/customer', getAllCustomers);
router.put('/customer/ubah/:customerId', editCustomer);
router.delete('/customer/hapus/:customerId', deleteCustomer);

export default router;
