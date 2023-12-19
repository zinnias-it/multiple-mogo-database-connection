import { Request } from 'express';
import { check } from 'express-validator';

export const validateCreateAdminUser = [
    check('full_name')
        .exists({
            checkNull: true,
            checkFalsy: true
        })
        .withMessage('full_name is required')
        .isLength({ min: 3 })
        .withMessage('full_name should be minimum 3 characters'),
    check('email')
        .exists({
            checkNull: true,
            checkFalsy: true
        })
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email is not valid')
        .normalizeEmail(),
    check('password')
        .exists({
            checkNull: true,
            checkFalsy: true
        })
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password should be minimum 8 characters'),
    check('phone_number')
        .exists({
            checkNull: true,
            checkFalsy: true
        })
        .withMessage('phone_number is required')
        .isMobilePhone('any')
        .withMessage('phone_number is not valid')
];

export const validateLoginAdminUser = [
    check('email')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email is not valid')
        .normalizeEmail(),
    check('password')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password should be minimum 8 characters')
];

export const validateVerifyOtp = [check('otp').isLength({ min: 6, max: 6 })];

export interface AuthRequest extends Request {
    user: {
        id: string;
    };
}
