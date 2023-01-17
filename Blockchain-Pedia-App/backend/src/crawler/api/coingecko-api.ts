import {Http} from "../http/http";
import {HttpJsonResponse} from "../http/http-json-response";

export class CoinGeckoApi {
    private static readonly API_BASE_URL = "https://api.coingecko.com/api/v3"
    private static readonly API_COIN_CURRENT_DATA = "/coins/"

    public async getCoinCurrentData(coinId: string): Promise<HttpJsonResponse> {
        let url = `${CoinGeckoApi.API_BASE_URL}${CoinGeckoApi.API_COIN_CURRENT_DATA}${coinId}`
        let response = await Http.performGet(url)

        if(response != undefined && response.statusCode == 429) {
            return this.getCoinCurrentData(coinId)
        }

        return response
    }

    public async timeout(delayTime: number) {
        await this.delay(delayTime)
        return new HttpJsonResponse(503, `Request aborted as it took longer than ${delayTime}ms`);
    }

    private delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}