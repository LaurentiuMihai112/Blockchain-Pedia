import {NextFunction, Request, Response} from "express";

export const logRequestMiddleware = (req: Request<any>, res: Response, next: NextFunction) => {
    const fs = require('fs');
    const util = require('util');
    const log_file = fs.createWriteStream('request_log.txt', {flags: 'a'});
    const log_stdout = process.stdout;
    console.log = function (s) {
        log_file.write(util.format('%s', s));
        log_stdout.write(util.format('%s', s));
    }
    console.log(`REQUEST ${req.method} ${req.url}\n`)
    console.log("Body\n")
    console.log(req.body);
    console.log("\nHeaders\n");
    console.log(req.body);
    console.log("\nQuery\n");
    console.log(req.query);
    console.log("\n\n")
    next();
}