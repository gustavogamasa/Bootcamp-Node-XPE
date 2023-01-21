import { promises as fs } from "fs";

const carList = await readFile(); // Lendo e guardando o arquivo json

await brandWithMostCars(carList); // Comparar e retornar a brand com mais modelos


async function brandWithMostCars(carList) {

    const dados = JSON.parse(carList);

    const array = [];

    dados.forEach(element => {
        // console.log(element.brand+" tem "+(element.models).length);
        array.push([element.brand, (element.models).length ])
    });
    
    console.log(array);

    const brandComMaisModels = Math.max(...array[1]);
    console.log(brandComMaisModels);

    






    // const numeroModels = Math.max(...dados.map(modelo => {
    //     return modelo.models.length
    // }));

    // const brandComMaisModels = dados.filter(item => item.models.length === numeroModels)
    // console.log(brandComMaisModels);




}

async function readFile() {

    try {

        const data = await fs.readFile("./car-list-master/car-list.json");
        return data;

    } catch (error) {

        console.log(error)

    }



}