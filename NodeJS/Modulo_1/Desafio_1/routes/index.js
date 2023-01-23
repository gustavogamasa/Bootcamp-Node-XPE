import express from "express";
import { createOrder, listAll } from "../src/pedidos.js";



const router = express.Router();


router.get("/listAll", listAll);
router.post("/newOrder", createOrder)



export { router }