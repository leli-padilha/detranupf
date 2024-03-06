import express from 'express';

const app = express();

app.use(express.json())

var items = [
    {
        id: 1,
        nome: "item 1",
        valor: 22
    },
    {
        id: 2,
        nome: "item 2",
        valor: 33
    }
];

function buscaItem(id){
    return items.findIndex(item => {
        return item.id == Number(id);
    });
}

app.get("/", (req, res) => {
    res.status(200).send("raiz do projeto");
});

app.get("/items", (req, res) => {
    res.status(200).json(items);
});

app.get("/items/:id", (req, res) => {
    const index = buscaItem(req.params.id);

    res.status(200).json(items[index]);
});

app.post("/items", (req, res) => {
    items.push(req.body);

    res.status(201).send("Item Adicionado");
});

app.put("/items/:id", (req, res) => {
    const index = buscaItem(req.params.id);
    items[index].nome = req.body.nome;
    items[index].valor = req.body.valor;
    res.status(200).json(items[index]);
});

app.delete("/items/:id", (req, res) => {
    const index = buscaItem(req.params.id);
    items.splice(index, 1);
    res.status(200).send("item removido");
});


export default app;
