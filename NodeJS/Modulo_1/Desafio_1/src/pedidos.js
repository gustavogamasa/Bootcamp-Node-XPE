
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

            if ((pedido.cliente).toLowerCase() == cliente.toLowerCase()) {
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

    const total = valores.reduce((accumulator, current) => accumulator + current);

    return res.json(total)


}

export async function prodMaisVendidos(req, res) {


    const prodMaisVendido = await dados.pedidos.map(pedido => {

        try {
                    

        } catch (error) {
            console.log("Pedido: " + pedido.id + " ");
        }

    })



}







