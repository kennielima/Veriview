import winston, { format } from 'winston';
import fs from "fs";
import path from 'path';
const { combine, json, timestamp, errors, colorize, simple } = format;


const formatDate = () => {
    var d = new Date(),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return `${year}${month}${day}`;
};

const getFile = (type: string) => {
    const d = formatDate();
    const filename = `./logs/${d}${type}.log`;

    fs.open(filename, "r", function (err: any, fd: number) {
        if (err) {
            fs.writeFile(filename, "", function (err: any) {
                if (err) {
                    return `logs/${type}.log`;
                }
                return filename;
            });
        } else {
            return filename;
        }
    });
    return filename;
};

const logger = winston.createLogger({
    level: 'info',
    format: combine(
        colorize(),
        simple(),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        errors({ stack: true }),
        json()),
    transports: [
        new winston.transports.Console({
            format: combine(
                colorize(),
                simple(),
            )
        }),
        new winston.transports.File({
            filename: getFile("error"),
            level: 'error'
        }),
        new winston.transports.File({
            filename: getFile("info"),
            level: 'info'
        }),
        new winston.transports.File({
            filename: getFile("warn"),
            level: 'warn'
        })
    ],
    defaultMeta: { service: 'checkout-service' }
});

export default logger;


// const logsDir = path.join(process.cwd(), 'logs');

// if (!fs.existsSync(logsDir)) {
//     fs.mkdirSync(logsDir, { recursive: true });
//     console.log(`Created logs directory: ${logsDir}`);
// }

// Get log file path and ensure it exists
// const getFile = (type: any) => {
//     const filename = path.join(logsDir, `${formatDate()}${type}.log`);
//     console.log(`Log file path: ${filename}`);
//     return filename;
// };

// const getFile = (type: string) => {
//     const d = formatDate();
//     const filename = path.join(logsDir, `${d}${type}.log`);

//     // Ensure the file exists synchronously
//     try {
//         fs.accessSync(filename, fs.constants.F_OK);
//     } catch (err) {
//         // File doesn't exist, create it
//         fs.writeFileSync(filename, '');
//     }

//     return filename;
// };



// const logsDir = path.join("logs");
// const filename = path.join(logsDir, `${d}${type}.log`);
// if (!fs.existsSync(logsDir)) {
//     fs.mkdirSync(logsDir);
// }
// if (!fs.existsSync(filename)) {
//     fs.writeFileSync(filename, "");
// }
