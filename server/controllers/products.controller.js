const express = require("express")
const router = express.Router()
const services = require('../services/product.services')

// http://localhost:8080/api/products/
router.get('/', async (req, res) => {

    const products = await services.getAllProducts()
    // console.log(products[0].category);
    res.send(products)
})

router.get('/:id', async (req, res) => {

    const product = await services.getProductById(req.params.id)
    if (product.length == 0) {
        res.status(404).json('No records with given Id :' + req.params.id)
    }
    else {
        res.json({product:product})
    }
})
router.delete('/:id', async (req, res) => {

    const affectedRows = await services.deleteProduct(req.params.id)
    if (affectedRows == 0) {
        res.status(404).json('No records with given Id :' + req.params.id)
    }
    else {
        res.send('deleted succefully')
    }
})
router.post('/', async (req, res) => {

    await services.addOrUpdateProduct(req.body)
    res.status(201).send('created succefully')
})
router.put('/:id', async (req, res) => {

    const affectedRows= await services.addOrUpdateProduct(req.body,req.params.id)
    if (affectedRows.length==0) {
        res.status(404).json('No records with given Id :' + req.params.id)
    }
    res.json('Updated succefully')
})

module.exports = router;