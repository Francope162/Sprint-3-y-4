require ("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const productRouter = require("./routes/products.js")

app.use(cors());

app.use("/api/products" ,productRouter);

app.listen(port, () => {
    console.log(`Servidor inicializado en http://localhost:${port}`);
});