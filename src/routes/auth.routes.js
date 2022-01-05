import { Router } from 'express';
import * as ctrl from '../controllers/auth.controller';

const router = Router();

router.post('/signin', ctrl.signIn);

router.post('/signup', ctrl.signUp);

export default router;
