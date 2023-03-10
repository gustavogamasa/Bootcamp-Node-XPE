import express from "express";
import { consultarOrder, createOrder, deleteOrder, deliverOrder, listAll, prodMaisVendidos, totalCliente, updateOrder } from "../src/pedidos.js";



const router = express.Router();


router.get("/listAll", listAll);
router.post("/newOrder", createOrder)
router.put("/updateOrder", updateOrder)
router.put("/deliverOrder", deliverOrder)
router.get("/consultarOrder", consultarOrder)
router.get("/totalCliente", totalCliente)
router.get("/prodMaisVendidos", prodMaisVendidos)



export { router }