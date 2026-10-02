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
productRouter.get('/', async (req, res, next) => {
    try {
        const products = await readProducts();
        res.json(products);
    } catch (error) {
        next(error);
    }
});

//Obtener un producto
productRouter.get('/:id', async (req, res, next) => {
    try {
        const products = await readProducts();
        const { id } = req.params;

        if (isNaN(id) || isNaN(Number(id))) {
            const error = new Error('El ID debe ser un número válido');
            error.statusCode = 400;
            return next(error);
        }

        const product = products.find(p => String(p.id) === String(id));

        if (!product) {
            const error = new Error("Producto no encontrado");
            error.statusCode = 404;
            return next(error);
        }

        res.json(product);
    } catch (error) {
        next(error);
    }
});

module.exports = productRouter;