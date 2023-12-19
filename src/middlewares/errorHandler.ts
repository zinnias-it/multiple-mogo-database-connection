import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import createError from 'http-errors';

// 404 not found handler
const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    next(createError(404, 'Your requested content was not found!'));
};

// default error handler
const errorHandler = (
    err: any,
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(err.status || 200).json({
        message: err.message,
        data: err.data,
        errors: err.errors
    });
};

const validationHandler = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
        // console.log(Object.keys(mappedErrors));
        next();
    } else {
        return next({
            status: 400,
            message: 'Validation Failed!!!',
            errors: mappedErrors
        });
    }
};

export { notFoundHandler, errorHandler, validationHandler };
