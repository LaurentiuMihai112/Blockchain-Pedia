import {Request, Response} from "express";
import {DataChartService} from "../service/data-chart-service";
import * as fs from "fs";

export class DataChartController {

    public static getChartForOrder = async (req: Request, res: Response): Promise<void> => {
        let filename = await DataChartService.getChart("order")
        res.status(200).send(filename)
    }

    public static getChartForFilter = async (req: Request, res: Response): Promise<void> => {
        let filename = await DataChartService.getChart("filter")
        res.status(200).send(filename)
    }

    public static getChartForSort = async (req: Request, res: Response): Promise<void> => {
        let filename = await DataChartService.getChart("sort")
        res.status(200).send(filename)
    }

    public static getChartFile = async (req: Request, res: Response): Promise<void> => {
        const {name} = req.query;
        if (name == undefined) {
            res.status(400).send()
            return;
        }

        if (!fs.existsSync('./' + name)) {
            res.status(404).send()
            return;
        }

        let options = {
            root: '.'
        };

        // @ts-ignore
        res.status(200).sendFile(name, options, function (err) {
            if (err) {
                console.log('Error: ' + name)
            } else {
                console.log('Sent:', name);
            }
        });
    }
}