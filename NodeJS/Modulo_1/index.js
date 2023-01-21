import {promises as fs} from "fs";

const carList = await readFile(); // Lendo e guardando o arquivo json

await brandWithMostCars(carList); // Comparar e retornar a brand com mais modelos


async function brandWithMostCars(carList){

       const dados = JSON.parse(carList);

       const numeroModels = Math.max(...dados.map(modelo => {
            return modelo.models.length
       }))

       console.log(numeroModels);

    
        

}

async function readFile(){

    try {

        const data = await fs.readFile("./car-list-master/car-list.json"); 
        return data;
        
    } catch (error) {

        console.log(error)
        
    }



}