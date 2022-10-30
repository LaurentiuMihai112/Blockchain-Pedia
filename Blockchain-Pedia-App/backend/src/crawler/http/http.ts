import {AxiosResponse} from "axios";
import {HttpJsonResponse} from "./http-json-response";

const axios = require('axios');

export class Http {
    public static async performGet(url: string): Promise<HttpJsonResponse> {
        return await axios({
            method: 'get',
            url
        })
            .then(function (response: AxiosResponse<any>) {
                let statusCode = response.status

                if (statusCode < 200 || statusCode > 299) {
                    return new HttpJsonResponse(statusCode, {})
                }

                let body = JSON.parse(JSON.stringify(response.data))
                return new HttpJsonResponse(statusCode, body)
            })
            .catch(function (error: any) {
                console.log(error);
            });
    }
}