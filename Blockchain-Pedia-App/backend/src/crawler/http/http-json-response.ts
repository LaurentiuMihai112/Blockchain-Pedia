export class HttpJsonResponse {
    constructor(statusCode: number, bodyAsJson: any) {
        this._statusCode = statusCode;
        this._bodyAsJson = bodyAsJson;
    }

    private _statusCode: number;

    get statusCode(): number {
        return this._statusCode;
    }

    set statusCode(value: number) {
        this._statusCode = value;
    }

    private _bodyAsJson: object;

    get bodyAsJson(): object {
        return this._bodyAsJson;
    }

    set bodyAsJson(value: object) {
        this._bodyAsJson = value;
    }
}