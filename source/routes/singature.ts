import express from 'express';
import controller from '../controllers/singature';

const router = express.Router();

router.get('/singatures', controller.getAllSingatures);
router.post('/singature', controller.createSingature);
router.put('/singature/:id', controller.updateSingature);
router.delete('/singature/:id', controller.deleteSingature);

export = router;
