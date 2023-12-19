import { User, Todo } from './test.model';
import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.post(
    '/create-user',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, isActive } = req.body;
            const user = new User({ name, isActive });
            const result = await user.save();
            res.status(201).json({
                message: 'User created successfully!',
                data: result
            });
        } catch (error) {
            next(error);
        }
    }
);

router.get(
    '/get-users',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await User.find({});
            res.status(200).json({
                message: 'User list!',
                data: users
            });
        } catch (error) {
            next(error);
        }
    }
);

router.post(
    '/create-todo',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { title, completed } = req.body;
            const todo = new Todo({
                title,
                completed
            });
            const result = await todo.save();
            res.status(201).json({
                message: 'Todo created successfully!',
                data: result
            });
        } catch (error) {
            next(error);
        }
    }
);

router.get(
    '/get-todos',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const todos = await Todo.find({});
            res.status(200).json({
                message: 'Todo list!',
                data: todos
            });
        } catch (error) {
            next(error);
        }
    }
);

export default router;
