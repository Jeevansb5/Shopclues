const express = require("express");
const cors = require("cors");
const bodyparser=require('body-parser')
require('express-async-errors')
const productRoutes = require('./controllers/products.controller')
const tshirts = require('./controllers/tshirts')
const orderRoutes= require('./controllers/orders.controller')

const app = express();

app.use(bodyparser.json())
app.use(cors());
const PORT = 8080;
app.use('/api/products', productRoutes);
app.use('/api/tshirt', tshirts);
app.use('/api/order', orderRoutes);


app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send('Something went wrong!!')
})

app.get('/', (req, res) => {
    res.json({ message: "hello world" });
})

app.listen(PORT, () => {
    console.log(`sever listening at port ${PORT}`);
})