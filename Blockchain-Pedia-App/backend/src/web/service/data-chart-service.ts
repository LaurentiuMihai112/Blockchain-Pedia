import fs from "fs";
import {ChartJSNodeCanvas} from "chartjs-node-canvas";
import {ChartTypeRegistry} from "chart.js";

const width = 300; //px
const height = 300; //px
const backgroundColour = 'white';
const chartJSNodeCanvas = new ChartJSNodeCanvas({width, height, backgroundColour});

export class DataChartService {
    public static async getChart(chartType: string): Promise<string> {
        let data = fs.readFileSync('request_log.txt', 'utf8');

        let lines = data.split("\n")
        lines = lines.filter(line => line.includes("REQUEST"))
            .map(line => line.split("\r")[0])
        lines = lines.map(line => line.split("GET")[1].trim())
        lines = lines.map(line => line.split("?")[1])

        let queryParams = lines
            .filter(line => line != undefined)
            .map(line => {
                let queryParamsStr = line.split("&")
                let splitQueryParams = queryParamsStr.map(s => {
                    let splitted = s.split("=")
                    return {
                        key: splitted[0],
                        value: splitted[1]
                    }
                })
                let queryParamsObj = {}
                splitQueryParams.forEach(param => {
                    // @ts-ignore
                    queryParamsObj[param.key] = param.value
                })
                return queryParamsObj
            })

        switch(chartType) {
            case "order": {
                return await this.generateChart(await this.buildChartForOrderConfiguration(queryParams))
            }
            case "sort": {
                return await this.generateChart(await this.buildChartForSortConfiguration(queryParams))
            }
            case "filter": {
                return await this.generateChart(await this.buildChartForFilterConfiguration(queryParams))
            }
            default: {
                return "";
            }
        }
    }

    private static async makeId() {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 10; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    private static async generateChart(configuration: ChartTypeRegistry): Promise<string> {
        // @ts-ignore
        const dataUrl = await chartJSNodeCanvas.renderToDataURL(configuration);
        const base64Image = dataUrl

        let base64Data = base64Image.replace(/^data:image\/png;base64,/, "");

        let filename = "out_" + await this.makeId() + ".png"

        fs.writeFile(filename, base64Data, 'base64', function (err) {
            if (err) {
                console.log(err);
            }
        });
        return filename
    }

    private static async buildChartForOrderConfiguration(queryParams: object[]): Promise<ChartTypeRegistry> {
        let numberOfAscOrders = 0
        let numberOfDescOrders = 0
        queryParams.forEach(queryParam => {
            // @ts-ignore
            if (queryParam['order'] == 'asc') {
                numberOfAscOrders += 1
            } else {
                numberOfDescOrders += 1
            }
        })

        const configuration = {
            type: 'bar',
            data: {
                labels: ["# of requests using 'order'"],
                datasets: [
                    {
                        label: "asc",
                        borderColor: ['rgb(51, 204, 204)'],
                        borderWidth: 1,
                        data: [numberOfAscOrders]
                    },
                    {
                        label: "desc",
                        borderColor: ['rgb(255, 102, 255)'],
                        borderWidth: 1,
                        data: [numberOfDescOrders]
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        suggestedMin: 0,
                    }
                }
            }
        }

        //@ts-ignore
        return configuration
    }

    private static async buildChartForSortConfiguration(queryParams: object[]): Promise<ChartTypeRegistry> {
        let numberOfMarketCap = 0;
        let numberOfPowerConsumption = 0;
        let numberOfPricePerTransaction = 0;
        let numberOfTransactionCount = 0;
        queryParams.forEach(queryParam => {
            // @ts-ignore
            switch(queryParam['sort']) {
                case 'powerConsumption': {
                    numberOfPowerConsumption += 1;
                    break;
                }

                case 'transactionCount': {
                    numberOfTransactionCount += 1;
                    break;
                }

                case 'pricePerTransaction': {
                    numberOfPricePerTransaction += 1;
                    break;
                }

                case 'marketCap': {
                    numberOfMarketCap += 1;
                    break;
                }

                default: {
                    break;
                }
            }
        })

        const configuration = {
            type: 'bar',
            data: {
                labels: ["# of requests using 'sort'"],
                datasets: [
                    {
                        label: "powerConsumption",
                        borderColor: ['rgb(51, 204, 204)'],
                        borderWidth: 1,
                        data: [numberOfPowerConsumption]
                    },
                    {
                        label: "transactionCount",
                        borderColor: ['rgb(255, 102, 255)'],
                        borderWidth: 1,
                        data: [numberOfTransactionCount]
                    },
                    {
                        label: "pricePerTransaction",
                        borderColor: ['rgb(255,0,0)'],
                        borderWidth: 1,
                        data: [numberOfPricePerTransaction]
                    },
                    {
                        label: "marketCap",
                        borderColor: ['rgb(74,255,0)'],
                        borderWidth: 1,
                        data: [numberOfMarketCap]
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        suggestedMin: 0,
                    }
                }
            }
        }

        //@ts-ignore
        return configuration
    }

    private static async buildChartForFilterConfiguration(queryParams: object[]): Promise<ChartTypeRegistry> {
        let numberOfMarketCap = 0;
        let numberOfPowerConsumption = 0;
        let numberOfPricePerTransaction = 0;
        let numberOfTransactionCount = 0;
        queryParams.forEach(queryParam => {
            // @ts-ignore
            switch(queryParam['filter']) {
                case 'powerConsumption': {
                    numberOfPowerConsumption += 1;
                    break;
                }

                case 'transactionCount': {
                    numberOfTransactionCount += 1;
                    break;
                }

                case 'pricePerTransaction': {
                    numberOfPricePerTransaction += 1;
                    break;
                }

                case 'marketCap': {
                    numberOfMarketCap += 1;
                    break;
                }

                default: {
                    break;
                }
            }
        })

        const configuration = {
            type: 'bar',
            data: {
                labels: ["# of requests using 'filter'"],
                datasets: [
                    {
                        label: "powerConsumption",
                        borderColor: ['rgb(51, 204, 204)'],
                        borderWidth: 1,
                        data: [numberOfPowerConsumption]
                    },
                    {
                        label: "transactionCount",
                        borderColor: ['rgb(255, 102, 255)'],
                        borderWidth: 1,
                        data: [numberOfTransactionCount]
                    },
                    {
                        label: "pricePerTransaction",
                        borderColor: ['rgb(255,0,0)'],
                        borderWidth: 1,
                        data: [numberOfPricePerTransaction]
                    },
                    {
                        label: "marketCap",
                        borderColor: ['rgb(74,255,0)'],
                        borderWidth: 1,
                        data: [numberOfMarketCap]
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        suggestedMin: 0,
                    }
                }
            }
        }

        //@ts-ignore
        return configuration
    }
}