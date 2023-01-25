
import { promises as fs } from "fs";

const dados = JSON.parse(await fs.readFile("./db/pedidos.json"))

export async function listAll(req, res) {

    return res.json(data);

}


export async function createOrder(req, res) {

    const nextID = dados.nextId;

    const { cliente, produto, valor } = req.body;

    const newJson = ({
        id: nextID,
        cliente: cliente,
        produto: produto,
        valor: valor,
        entregue: false,
        timestamp: new Date()
    })

    dados.pedidos.push(newJson);
    dados.nextId = nextID + 1;

    await fs.writeFile("./db/pedidos.json", JSON.stringify(dados));
    console.log("--- Pedido ID:" + nextID + " adicionado");



    return res.json(
        await dados.pedidos.find(item => item.id === nextID)
    );

}


export async function updateOrder(req, res) {

    const { id, cliente, produto, valor, entregue } = req.body;

    if (dados.pedidos.find(pedidos => pedidos.id === id)) {

        dados.pedidos[(id - 1)] = ({

            id: id,
            cliente: cliente,
            produto: produto,
            valor: valor,
            entregue: entregue,
            timestamp: dados.pedidos[(id - 1)].timestamp

        })

        await fs.writeFile("./db/pedidos.json", JSON.stringify(dados));

        return res.json(dados.pedidos[id - 1])

    } else {
        console.log("Pedido não encontrado");
        return res.status(400).send("Not Found");
    }

}

export async function deliverOrder(req, res) {

    const { id } = req.body;

    if (dados.pedidos.find(pedidos => pedidos.id === id)) {

        dados.pedidos[(id - 1)] = ({

            id: id,
            cliente: dados.pedidos[(id - 1)].cliente,
            produto: dados.pedidos[(id - 1)].produto,
            valor: dados.pedidos[(id - 1)].valor,
            entregue: true,
            timestamp: dados.pedidos[(id - 1)].timestamp

        })

        await fs.writeFile("./db/pedidos.json", JSON.stringify(dados));

        return res.json(dados.pedidos[id - 1])

    } else {
        console.log("Pedido não encontrado");
        return res.status(400).send("Not Found");
    }

}

export async function deleteOrder(req, res) {

    const { id } = req.body;

    if (dados.pedidos.filter(pedidos => pedidos.id === id)) {

        const filtered = await dados.pedidos.filter(pedido => {

            if (pedido.id != id) return pedido;
        });

        dados.pedidos = filtered;

        await fs.writeFile("./db/pedidos.json", JSON.stringify(dados));
        console.log("Pedido excluido");

        return res.json(dados.pedidos[id - 1])

    } else {
        console.log("Pedido não encontrado");
        return res.status(400).send("Not Found");
    }

}

export async function consultarOrder(req, res) {

    const { id } = req.body;

    if (dados.pedidos.find(pedidos => pedidos.id === id)) {

        return res.json(dados.pedidos[id - 1])

    } else {
        console.log("Pedido não encontrado");
        return res.status(400).send("Not Found");
    }

}


export async function totalCliente(req, res) {

    const { cliente } = req.body;

    const pedidos = await dados.pedidos.filter(pedido => {

        try {

            if ((pedido.cliente).toLowerCase() == cliente.toLowerCase() && pedido.entregue === true) {
                return pedido;
            }

        } catch (error) {
            console.log("Pedido " + pedido.id + " sem cliente");
        }

    }) // FILTER pedido

    const valores = await pedidos.map(item => {
        if (item.valor) {
            console.log(item.valor);
            return item.valor;
        }
    })

    const total = valores.reduce((accumulator, current) => accumulator + current, 0);

    return res.json(total)


}
export async function totalProduto(req, res) {

    const { produto } = req.body;

    const pedidos = await dados.pedidos.filter(pedido => {

        try {

            if ((pedido.produto).toLowerCase() == produto.toLowerCase() && pedido.entregue === true) {
                return pedido;
            }

        } catch (error) {
            console.log("Pedido " + pedido.id + " sem cliente");
        }

    }) // FILTER pedido

    const valores = await pedidos.map(item => {
        if (item.valor) {
            console.log(item.valor);
            return item.valor;
        }
    })

    const total = valores.reduce((accumulator, current) => accumulator + current, 0);

    return res.json(total)


}

export async function prodMaisVendidos(req, res) {

    let mucarela = 0;
    let napolitana = 0;
    let pepperoni = 0;
    let atum = 0;
    let calabresa = 0;
    let moda = 0;
    let frango = 0;



    const todosProdutos = await dados.pedidos.map(pedido => {

        try {
            return pedido.produto;
        } catch (error) {
            console.log("Pedido: " + pedido.id + " sem produto");
        }
    })


    await todosProdutos.map(pedido => {

        console.log(pedido);

        if (pedido === "Pizza Muçarela") mucarela++;
        if (pedido === "Pizza Napolitana") napolitana++;
        if (pedido === "Pizza Pepperoni") pepperoni++;
        if (pedido === "Pizza Atum") atum++;
        if (pedido === "Pizza Calabresa") calabresa++;
        if (pedido === "Pizza a Moda") moda++;
        if (pedido === "Pizza Frango com Catupiry") frango++;



    })

    const resultado = ({
        mucarela: mucarela,
        napolitana: napolitana,
        pepperoni: pepperoni,
        atum: atum,
        calabresa: calabresa,
        moda: moda,
        frango: frango

    })





    return res.json(resultado)

}







