import { promises as fs } from "fs";

const dados = JSON.parse(await readFile());


export function maisModelos (req, res)  {

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

}










async function readFile() {

    const dados = await fs.readFile("./car-list.json");
    console.log(" ----- Carregou car-list.json ------");

    return dados;
}