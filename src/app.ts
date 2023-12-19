require('dotenv').config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';

// ROUTES v1
import adminUserRoutes from './modules/adminUser/v1/adminUser.routes';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';

const PORT = process.env.PORT || 8080;
const app = express();

const main = async () => {
    try {
        app.use(cors());
        app.use(morgan('dev'));
        app.use(express.json());

        // DB connection
        mongoose
            .connect(process.env.MONGO_URL_1 || '')
            .then(() => {
                console.log('DB connection successfully!');
            })
            .catch((err) => {
                console.log(err);
            });

        // ROUTES v1
        app.use('/api/v1/admin', adminUserRoutes);

        // 404 not found handler
        app.use(notFoundHandler);
        // common error handler
        app.use(errorHandler);

        app.listen(PORT, () => {
            console.log('Now running on port ' + PORT);
        });
    } catch (error) {
        console.log(error);
    }
};

main();
