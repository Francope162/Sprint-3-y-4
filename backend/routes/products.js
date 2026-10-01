const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const productRouter = express.Router();
const filePath = path.join(__dirname, '../db/products.json');

productRouter.use(express.json());

//Obtener datos desde archivo JSON
async function readProducts() {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') return [];
        throw error;
    }
}

//Obtener todos los productos
productRouter.get('/', async (req, res) => {
    try {
        const products = await readProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

//Obtener un producto
productRouter.get('/:id', async (req, res) => {
    try {
        const products = await readProducts();
        const { id } = req.params;

        const product = products.find(p => String(p.id) === String(id));

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

module.exports = productRouter;