import express, { json } from "express";
import {promises as fs} from "fs";

const app = express();
app.use(express.json())



app.get("/file", async (req, res) => {
    
    let dados = await readFile();
    // console.log(JSON.parse(dados));
    return res.json(JSON.parse(dados))
})

















async function readFile(){

    const dados =  await fs.readFile("./car-list.json");

    return dados;
}









app.listen(3333, ()=>{console.log("Api online - Port 3333")})