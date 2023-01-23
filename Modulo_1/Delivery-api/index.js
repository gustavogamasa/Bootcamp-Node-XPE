import express from "express";
import { router } from "./routes/index.js";



const delivery_app = express();

delivery_app.use(express.json());
delivery_app.use(router);

delivery_app.listen(3333, () => { console.log(" --- Server online ---"); })