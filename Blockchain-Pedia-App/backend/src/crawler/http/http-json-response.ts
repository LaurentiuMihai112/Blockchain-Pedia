export class HttpJsonResponse {
    private _statusCode: number;
    private _bodyAsJson: object;

    constructor(statusCode: number, bodyAsJson: any) {
        this._statusCode = statusCode;
        this._bodyAsJson = bodyAsJson;
    }

    get statusCode(): number {
        return this._statusCode;
    }

    set statusCode(value: number) {
        this._statusCode = value;
    }

    get bodyAsJson(): object {
        return this._bodyAsJson;
    }

    set bodyAsJson(value: object) {
        this._bodyAsJson = value;
    }
}