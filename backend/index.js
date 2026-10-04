require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const productRouter = require("./routes/products.js");
const logger = require("./middlewares/logger.js");
const notFound = require("./middlewares/notFound.js");
const errorHandler = require("./middlewares/errorHandler.js");

app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/api/products", productRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Servidor inicializado en http://localhost:${port}`);
});
