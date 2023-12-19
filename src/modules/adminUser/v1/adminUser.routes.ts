import { Router } from 'express';
import {
    validateCreateAdminUser,
    validateLoginAdminUser
} from './adminUser.middleware';
import withErrorHandling from '../../../utils/withErrorHandling';
import {
    getAuthAdminUser,
    postCreateAdminUser,
    postLoginAdminUser
} from './adminUser.controller';
import { validationHandler } from '../../../middlewares/errorHandler';
import checkLogin from '../../../middlewares/checkLogin';

const router = Router();

router.post(
    '/create',
    validateCreateAdminUser,
    validationHandler,
    withErrorHandling(postCreateAdminUser)
);

router.post(
    '/login',
    validateLoginAdminUser,
    validationHandler,
    withErrorHandling(postLoginAdminUser)
);

router.get('/auth', checkLogin, withErrorHandling(getAuthAdminUser));

export default router;
