import { Router } from 'express';
import { protect } from '../middlewares/auth';
import { createCrudController } from '../controllers/crudFactory';
import Contact from '../models/Contact';

const router = Router();
const ctrl = createCrudController(Contact, 'Contact');

router.get('/', ctrl.getAll);
router.post('/', ctrl.create); // Anyone should be able to POST a contact form inquiry!
router.get('/:id', protect, ctrl.getById);
router.put('/:id', protect, ctrl.update);
router.delete('/:id', protect, ctrl.remove);
router.patch('/:id/restore', protect, ctrl.restore);

export default router;
