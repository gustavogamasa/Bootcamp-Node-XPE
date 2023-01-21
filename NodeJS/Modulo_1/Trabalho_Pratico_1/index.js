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

    const dados = JSON.parse(await readFile());

    // Procurar maior quantidade
    const maiorQtd = Math.max(...dados.map(item => {
        return item.models.length;
    }));

    // Encontrar marca com essa quantidade
    const marcaMaiorQtd = dados.filter(item => item.models.length === maiorQtd)

    let result;

    // Se houver empate
    if (marcaMaiorQtd.length > 1) {

        result = res.json(marcaMaiorQtd.map(item => {
            return ({
                Marca_com_mais_modelos: item.brand,
                Quantidade_Modelos: item.models.length
            });
        }))



    } // Se não houver empate
    else {

        result = res.json({
            Marca_com_mais_modelos: marcaMaiorQtd[0].brand,
            Quantidade_Modelos: marcaMaiorQtd[0].models.length
        })

    }


    return result;


})


app.get("/marca-com-menos-modelos", async (req, res) => {

    const dados = JSON.parse(await readFile());

    // Procurar menor quantidade
    const menorQtd = Math.min(...dados.map(item => {
        return item.models.length;
    }));

    // Encontrar marca com essa quantidade
    const marcaMenorrQtd = dados.filter(item => item.models.length === menorQtd)

    let result;

    // Se houver empate
    if (marcaMenorrQtd.length > 1) {

        result = res.json(marcaMenorrQtd.map(item => {
            return ({
                Marca_com_mais_modelos: item.brand,
                Quantidade_Modelos: item.models.length
            });
        }))



    } // Se não houver empate
    else {

        result = res.json({
            Marca_com_menos_modelos: marcaMenorrQtd[0].brand,
            Quantidade_Modelos: marcaMenorrQtd[0].models.length
        })

    }


    return result;


})

app.get("/listar-marcas-mais-modelos", async (req, res) => {

    const qtdMarcas = req.query.numeroMarcas;
    const dados = JSON.parse(await readFile());

    const maiores = dados.sort(function compare(item1, item2) {
        if (item1.models.length < item2.models.length) return -1;
        if (item1.models.length > item2.models.length) return 1;
        return 0
    });

    let maioresSlice = (maiores.slice(0, qtdMarcas));

    let result = res.json(maioresSlice.map(item => {
        return ({
            Marca: item.brand,
            Modelos: item.models.length
        })
    }))




    return result;

    // listar maiores brands
    // pegar os x primeiros itens




})










async function readFile() {

    const dados = await fs.readFile("./car-list.json");
    console.log(" - Carregou car-list.json");

    return dados;
}









app.listen(3333, () => { console.log("Api online - Port 3333") })