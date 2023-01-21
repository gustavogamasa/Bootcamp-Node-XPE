import { Request, Response } from "express";
import { promises as fs } from "fs";
import { FindBrandWithMostModelsService } from "../Services/FindBrandWithMostModelsService"


class FindBrandWithMostModelsController {

    async handle(req: Request, res: Response) {

      

        const service = new FindBrandWithMostModelsService;

        const result = await service.execute();

        return res.json(result);

    }



}


export { FindBrandWithMostModelsController }