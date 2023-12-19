import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { AuthRequest } from './adminUser.middleware';
import AdminUser from './adminUser.schema';

export const postCreateAdminUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const adminUser = await AdminUser.create({
        ...req.body,
        password: await bcrypt.hash(req.body.password, 10)
    });

    res.status(201).json({
        message: 'Admin user created successfully',
        data: { ...adminUser.toObject(), password: undefined, otp: undefined }
    });
};

export const postLoginAdminUser = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const { email, password } = req.body;

    const adminUser = await AdminUser.findOne(
        { email: email },
        {
            full_name: 1,
            password: 1,
            email: 1,
            name: 1,
            phone_number: 1
        }
    ).lean();

    if (!adminUser) {
        return next({
            status: 404,
            message: 'Invalid email or password!'
        });
    }
    const isPasswordValid = await bcrypt.compare(password, adminUser.password);
    if (!isPasswordValid) {
        return next({
            status: 404,
            message: 'Invalid email or password!'
        });
    }

    const token = jwt.sign(
        { id: adminUser._id },
        process.env.JWT_SECRET || '',
        {
            expiresIn: '1d'
        }
    );

    res.status(200).json({
        message: 'Login successfully',
        data: {
            ...adminUser,
            password: undefined
        },
        token
    });
};

export const getAuthAdminUser = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const adminUser = await AdminUser.findById(req.user.id, {
        full_name: 1,
        email: 1,
        name: 1,
        phone_number: 1
    }).lean();

    if (!adminUser) {
        return next({
            status: 401,
            message: 'Unauthorized'
        });
    }

    res.status(200).json({
        message: 'Get admin user successfully',
        data: adminUser
    });
};
