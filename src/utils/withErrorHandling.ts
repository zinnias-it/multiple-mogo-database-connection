import createHttpError from 'http-errors';
import { Request, Response, NextFunction } from 'express';

const withErrorHandling =
    (fn: any) => (req: Request, res: Response, next: NextFunction) => {
        return Promise.resolve(fn(req, res, next)).catch((error) =>
            next(createHttpError(500, error.message))
        );
    };

export default withErrorHandling;
