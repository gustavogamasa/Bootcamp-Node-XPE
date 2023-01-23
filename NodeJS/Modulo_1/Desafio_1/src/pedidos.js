
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
    dados.nextId = nextID +1;

    await fs.writeFile("./db/pedidos.json", JSON.stringify(dados));
    console.log("--- Pedido ID:"+nextID+" adicionado");

    

    return res.json(
        await dados.pedidos.find(item => item.id === nextID)
    );

}


export async function updateOrder(req, res) {

    const {id} = req.query;
    console.log(id);

    const pedido = await dados.pedidos.find(item => {
        if(item.id == id) return item
    })

    console.log(pedido);

    return res.json(pedido)

    // const newJson = ({
    //     id: id,
    //     cliente: cliente,
    //     produto: produto,
    //     valor: valor,
    //     entregue: false,
    //     timestamp: new Date()
    // })

    // dados.pedidos.push(newJson);
    // dados.nextId = nextID +1;

    // await fs.writeFile("./db/pedidos.json", JSON.stringify(dados));
    // console.log("--- Pedido ID:"+nextID+" adicionado");

    

    // return res.json(
    //     await dados.pedidos.find(item => item.id === nextID)
    // );

}









