import mongoose, { Connection } from 'mongoose';

function makeNewConnection(uri: string): Connection {
    const db: Connection = mongoose.createConnection(uri);

    db.on('error', (error) => {
        console.log(
            `MongoDB ::  ${db.name} connection  ${JSON.stringify(error)}`
        );
        db.close().catch(() =>
            console.log(`MongoDB :: failed to close connection ${db.name}`)
        );
    });

    db.on('connected', () => {
        mongoose.set('debug', (col, method, query, doc) => {
            console.log(
                `MongoDB :: ${db.name} ${col}.${method}(${JSON.stringify(
                    query
                )},${JSON.stringify(doc)})`
            );
        });
        console.log(`MongoDB :: connected ${db.name}`);
    });

    db.on('disconnected', () => {
        console.log(`MongoDB :: disconnected ${db.name}`);
    });

    return db;
}
const mongoUrl1 = process.env.MONGO_URL_1 || '';
const mongoUrl2 = process.env.MONGO_URL_2 || '';

const userConnection: Connection = makeNewConnection(mongoUrl1);
const todoConnection: Connection = makeNewConnection(mongoUrl2);

export { userConnection, todoConnection };
