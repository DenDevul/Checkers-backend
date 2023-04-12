import { Router } from 'express';
import { get } from '../controllers/index.ts';

const router = Router();

router.get('/', get);

export default router;
