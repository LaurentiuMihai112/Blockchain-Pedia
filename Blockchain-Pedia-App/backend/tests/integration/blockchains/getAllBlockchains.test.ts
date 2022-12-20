import axios, {AxiosInstance} from "axios";

let axiosInstance: AxiosInstance;

describe("Integration Test: GET /blockchains/all", () => {
    beforeAll(() => {
        axiosInstance = axios.create({
            baseURL: 'http://localhost:8000'
        });
    });

    describe("Success Tests", () => {
        it("should fetch all items without any filters", async () => {
            const response = await axiosInstance.get("/blockchains/all");
            expect(response.status).toEqual(200);
            expect(response.data?.length).toBeGreaterThan(0);
        });

        it("should find 0 items as filter is impossible to match", async () => {
            const response = await axiosInstance.get("/blockchains/all", {
                params: {
                    filterBy: 'transactionCount',
                    min: '0',
                    max: '1'
                }
            });
            expect(response.status).toEqual(200);
            expect(response.data?.length).toEqual(0);
        });

        it("should sort the items correctly", async () => {
            const response = await axiosInstance.get("/blockchains/all", {
                params: {
                    sortBy: 'powerConsumption',
                    order: 'desc'
                }
            });

            expect(response.status).toEqual(200);
            expect(response.data?.length).toBeGreaterThan(0);

            const blockchains = [...response.data];
            blockchains.sort((a,b) => a - b);

            expect(response.data[0]).toStrictEqual(blockchains[0]);
        });
    });

    describe("Failure Tests", () => {
        it("should fail with 400 when filterBy is specified without min and max", async () => {
            try {
                expect(await axiosInstance.get("/blockchains/all", {
                    params: {
                        filterBy: 'powerConsumption'
                    }
                })).toThrow();
            } catch (error: any) {
                expect(error.response.status).toEqual(400);
                expect(error.response.data).toEqual('Missing specification for filter.');
            }
        })

        it("should fail with 400 when filters are inconsistent", async () => {
            try {
                expect(await axiosInstance.get("/blockchains/all", {
                    params: {
                        filterBy: 'powerConsumption,marketCap',
                        min: '-1',
                        max: '-1,2'
                    }
                })).toThrow();
            } catch (error: any) {
                expect(error.response.status).toEqual(400);
                expect(error.response.data).toEqual('Inconsistent filters');
            }
        })

        it("should fail with 400 when order is not specified, but sortBy is", async () => {
            try {
                expect(await axiosInstance.get("/blockchains/all", {
                    params: {
                        sortBy: 'powerConsumption'
                    }
                })).toThrow();
            } catch (error: any) {
                expect(error.response.status).toEqual(400);
                expect(error.response.data).toEqual('Invalid order option.');
            }
        })
    });
});