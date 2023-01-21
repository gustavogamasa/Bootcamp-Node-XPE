import { Request, Response, Router } from "express";


const routes = Router();

routes.get("/status", (req: Request, res: Response) => { return res.json({ status: "online" }) })


export { routes };