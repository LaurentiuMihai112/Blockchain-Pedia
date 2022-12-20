import axios, {AxiosInstance} from "axios";

let axiosInstance: AxiosInstance;

describe("Integration Test: GET /blockchains/recommendations", () => {
    beforeAll(() => {
        axiosInstance = axios.create({
            baseURL: 'http://localhost:8000'
        });
    });

    describe("Success Tests", () => {
        it("should fetch recommendations", async () => {
            const response = await axiosInstance.get("/blockchains/recommendations", {
                params: {
                    "type": "PUBLIC",
                    "maxPricePerTransaction": "100000000000",
                    "minPricePerTransaction": "0",
                    "maxTransactionCount": "100000000000",
                    "minTransactionCount": "0",
                    "maxMarketCap": "100000000000",
                    "minMarketCap": "0",
                    "maxPowerConsumption": "100000000000",
                    "minPowerConsumption": "0"
                }
            });

            expect(response.status).toEqual(200);
            expect(response.data?.length).toBeGreaterThan(0);
        });
    });

    describe("Failure Tests", () => {
        it("should fail with 400 when a field is missing", async () => {
            try {
                expect(await axiosInstance.get("/blockchains/recommendations", {
                    params: {
                        "maxPricePerTransaction": "100000000000",
                        "minPricePerTransaction": "0",
                        "maxTransactionCount": "100000000000",
                        "minTransactionCount": "0",
                        "maxMarketCap": "100000000000",
                        "minMarketCap": "0",
                        "maxPowerConsumption": "100000000000",
                        "minPowerConsumption": "0"
                    }
                })).toThrow();
            } catch (error: any) {
                expect(error.response.status).toEqual(400);
                expect(error.response.data).toEqual('Found invalid values in request body!');
            }
        });
    });
});