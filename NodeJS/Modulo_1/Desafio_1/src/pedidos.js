
import { promises as fs } from "fs";

const data = await JSON.parse(await fs.readFile("./db/pedidos.json"))

export async function listAll(req, res) {

    return res.json(data);

}





async function loadPedidos(){

    let data = await fs.readFile("./db/pedidos.json");
    return data;
}