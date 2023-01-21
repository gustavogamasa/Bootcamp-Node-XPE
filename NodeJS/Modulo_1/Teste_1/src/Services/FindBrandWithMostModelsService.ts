import {promises as fs} from "fs";

class FindBrandWithMostModelsService {



    async execute() {


        const result = await brandWithMostCars(carList); // Comparar e retornar a brand com mais modelos


        async function brandWithMostCars(carList) {

            const dados = await  JSON.parse(carList);


            //Procurar maior numero de modelos
            const maiorNumero = Math.max(...dados.map(element => {
                return element.models.length
            }));

            console.log(maiorNumero);

            //Procurar brand com maior numero
            const brandMaisModelos = dados.filter(element => element.models.length === maiorNumero);
            console.log(brandMaisModelos);

            return brandMaisModelos;


        }

        return result;

    }




}

export { FindBrandWithMostModelsService }