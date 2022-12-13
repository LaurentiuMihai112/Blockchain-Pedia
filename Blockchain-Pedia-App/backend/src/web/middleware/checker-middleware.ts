import {NextFunction, Request, Response} from "express";

function isValidSortByValue(value: string): boolean {
    const acceptedValues = ["marketCap", "powerConsumption", "pricePerTransaction", "transactionCount"]
    return acceptedValues.includes(value)
}

function isValidFilterByValue(value: string): boolean {
    const acceptedValues = ["marketCap", "powerConsumption", "pricePerTransaction", "transactionCount"]
    return acceptedValues.includes(value)
}

function isValidOrderValue(value: string): boolean {
    const acceptedValues = ["asc", "desc"]
    return acceptedValues.includes(value)
}

function isNumericValue(value: string): boolean {
    return !isNaN(Number(value))
}

export const checkRequestMiddleware = (req: Request<any>, res: Response, next: NextFunction) => {
    let query = req.query
    let queryKeys = Object.keys(query)

    let isError = false;
    let paramNameWithError = ""
    let paramValueWithError = ""
    // for (let key of queryKeys) {
    //     switch (key) {
    //         case "sortBy":
    //             if (!isValidSortByValue(String(query[key]))) {
    //                 isError = true;
    //                 paramNameWithError = key
    //                 paramValueWithError = String(query[key])
    //             }
    //             break;
    //
    //         case "filterBy":
    //             if (!isValidFilterByValue(String(query[key]))) {
    //                 isError = true;
    //                 paramNameWithError = key
    //                 paramValueWithError = String(query[key])
    //             }
    //             break;
    //
    //         case "order":
    //             if (!isValidOrderValue(String(query[key]))) {
    //                 isError = true;
    //                 paramNameWithError = key
    //                 paramValueWithError = String(query[key])
    //             }
    //             break;
    //
    //         case "min":
    //             if (!isNumericValue(String(query[key]))) {
    //                 isError = true;
    //                 paramNameWithError = key
    //                 paramValueWithError = String(query[key])
    //             }
    //             break;
    //
    //         case "max":
    //             if (!isNumericValue(String(query[key]))) {
    //                 isError = true;
    //                 paramNameWithError = key
    //                 paramValueWithError = String(query[key])
    //             }
    //             break;
    //     }
    //
    //     if (isError) {
    //         break;
    //     }
    // }

    if (isError) {
        res.status(400).send(
            "Received an invalid value for query parameter \"" + paramNameWithError + "\": \"" + paramValueWithError + "\"."
        ).end()
        return;
    }

    next();
}