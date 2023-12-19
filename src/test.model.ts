import mongoose from 'mongoose';
import { userConnection, todoConnection } from './connection';

const userSchema = new mongoose.Schema(
    {
        name: String,
        isActive: Boolean
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const todoSchema = new mongoose.Schema(
    {
        title: String,
        completed: Boolean
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const User = userConnection.model('User', userSchema);
const Todo = todoConnection.model('Todo', todoSchema);

export { User, Todo };
