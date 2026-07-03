import { Router } from 'express';
import { protect } from '../middlewares/auth';
import { createCrudController } from '../controllers/crudFactory';
import Media from '../models/Media';

const router = Router();
const ctrl = createCrudController(Media, 'Media');

router.get('/', ctrl.getAll);
router.post('/', protect, ctrl.create);
router.get('/:id', ctrl.getById);
router.put('/:id', protect, ctrl.update);
router.delete('/:id', protect, ctrl.remove);

export default router;
