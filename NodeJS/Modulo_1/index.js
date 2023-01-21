import { promises as fs } from "fs";

const carList = await readFile(); // Lendo e guardando o arquivo json

await brandWithMostCars(carList); // Comparar e retornar a brand com mais modelos


async function brandWithMostCars(carList) {

    const dados = JSON.parse(carList);


    //Procurar maior numero de modelos
    const maiorNumero = Math.max(...dados.map(element => {
        return element.models.length
    }));

    console.log(maiorNumero);

    //Procurar brand com maior numero

    const brandMaisModelos = dados.filter(element => element.models.length === maiorNumero);
    console.log(brandMaisModelos);






}






// const numeroModels = Math.max(...dados.map(modelo => {
//     return modelo.models.length
// }));

// const brandComMaisModels = dados.filter(item => item.models.length === numeroModels)
// console.log(brandComMaisModels);






async function readFile() {

    try {

        const data = await fs.readFile("./car-list-master/car-list.json");
        return data;

    } catch (error) {

        console.log(error)

    }



}