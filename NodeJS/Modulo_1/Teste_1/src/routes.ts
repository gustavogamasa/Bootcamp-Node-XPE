import { Request, Response, Router } from "express";
import { FindBrandWithMostModelsController } from "./Controllers/FindBrandWithMostModelsController";


const routes = Router();

routes.get("/status", (req: Request, res: Response) => { return res.json({ status: "online" }) })




routes.get("/marca-com-mais-modelos", new FindBrandWithMostModelsController().handle)





export { routes };