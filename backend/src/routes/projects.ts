import { Router } from 'express';
import { protect } from '../middlewares/auth';
import { createCrudController } from '../controllers/crudFactory';
import Project from '../models/Project';

const router = Router();
const ctrl = createCrudController(Project, 'Project');

router.get('/', ctrl.getAll);
router.post('/', protect, ctrl.create);
router.patch('/reorder', protect, ctrl.reorder);
router.get('/:id', ctrl.getById);
router.put('/:id', protect, ctrl.update);
router.delete('/:id', protect, ctrl.remove);
router.patch('/:id/restore', protect, ctrl.restore);
router.patch('/:id/publish', protect, ctrl.publish);

export default router;
