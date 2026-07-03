import { Router } from 'express';
import { protect } from '../middlewares/auth';
import { createCrudController } from '../controllers/crudFactory';
import HeroShowcase from '../models/HeroShowcase';

const router = Router();
const ctrl = createCrudController(HeroShowcase, 'HeroShowcase', { populate: 'featuredProjects.project' });

router.get('/', ctrl.getAll);
router.post('/', protect, ctrl.create);
router.get('/:id', ctrl.getById);
router.put('/:id', protect, ctrl.update);
router.delete('/:id', protect, ctrl.remove);
router.patch('/:id/restore', protect, ctrl.restore);
router.patch('/:id/publish', protect, ctrl.publish);

export default router;
