import express from "express";
import { createOrder, deleteOrder, deliverOrder, listAll, updateOrder } from "../src/pedidos.js";



const router = express.Router();


router.get("/listAll", listAll);
router.post("/newOrder", createOrder)
router.put("/updateOrder", updateOrder)
router.put("/deliverOrder", deliverOrder)
router.delete("/deleteOrder", deleteOrder)



export { router }