import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
export default (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return next({
            status: 401,
            message: 'Unauthorized'
        });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET || '');

    if (!user) {
        return next({
            status: 401,
            message: 'Unauthorized'
        });
    }
    // @ts-ignore
    req.user = user;

    next();
};
