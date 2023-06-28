import { Router } from 'express';
import { RefurbishController } from './controllers/refurbish';

const router: Router = Router();
const controller = new RefurbishController();

router.get('/', (req, res) => {
  res.send('hello word');
});

router.get('/refurbishs', controller.getAll);
router.get('/refurbishs/:id', controller.get);
router.post('/refurbishs', controller.create);
router.put('/refurbishs/:id', controller.update);
router.delete('/refurbishs/:id', controller.delete)

export { router };
