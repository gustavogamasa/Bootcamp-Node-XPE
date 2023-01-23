import express from "express";
import { listAll } from "../src/pedidos.js";



const router = express.Router();


router.get("/test", listAll);



export { router }