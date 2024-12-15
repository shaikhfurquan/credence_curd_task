import winston from 'winston';
import 'winston-mongodb';
import dotenv from 'dotenv'
dotenv.config()


const logger = winston.createLogger({

    // will carry the data from the application to either in the console/file
    transports: [
        // for info logs
        new winston.transports.File({
            filename: './logs/info.log',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            level: 'info'
        }),

        // for error logs
        new winston.transports.File({
            filename: './logs/error.log',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            level: 'error'
        }),

        // creating the MongoDB transporter
        new winston.transports.MongoDB({
            level: 'error',
            db: `${process.env.DB_URL}${process.env.DB_NAME}`,
            collection: 'logs',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            options: {
                useUnifiedTopology: true
            }
        })
    ],
});

export default logger;
