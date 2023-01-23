import express from "express";
import { maisModelos } from "../src/car-list.js";



export const router = express.Router();
console.log("Carergou router");

router.get('/marcas/maisModelos', maisModelos);