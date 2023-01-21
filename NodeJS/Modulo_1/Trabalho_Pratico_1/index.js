import express, { json } from "express";
import { promises as fs } from "fs";

const app = express();
app.use(express.json())



app.get("/file", async (req, res) => {

    let dados = await readFile();
    // console.log(JSON.parse(dados));
    return res.json(JSON.parse(dados))
})


app.get("/marca-com-mais-modelos", async (req, res) => {

    const carList = await readFile();
    const dados = JSON.parse(carList);

    // Procurar maior quantidade
    const maiorQtd = Math.max(...dados.map(item => {
        return item.models.length;
    }));

    // Encontrar marca com essa quantidade
    const marcaMaiorQtd = dados.filter(item => item.models.length === maiorQtd)

    // console.log("Marca com maior quantidade: " + marcaMaiorQtd[0].brand);
    // console.log("Modelos: " + maiorQtd);

    return res.json({
        Marca_com_mais_modelos: marcaMaiorQtd[0].brand,
        Qtd_Modelos: marcaMaiorQtd[0].models.length
    })


})















async function readFile() {

    const dados = await fs.readFile("./car-list.json");
    console.log(" - Carregou car-list.json");

    return dados;
}









app.listen(3333, () => { console.log("Api online - Port 3333") })