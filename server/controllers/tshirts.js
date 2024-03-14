const express = require("express")
const router = express.Router()
const services = require('../services/product.services')

router.get('/', async (req, res) => {

    const products = await services.getAllProducts()
    const tshirt=products.filter((products)=>{
        return products.category=="t-shirt"
    })
    res.json({tshirt: tshirt})
})
router.get('/hoodie', async (req, res) => {

    const products = await services.getAllProducts()
    const hoodie=products.filter((products)=>{
        return products.category=="hoodie"
    })
    res.json({hoodie: hoodie})
})
router.get('/mobile', async (req, res) => {

    const products = await services.getAllProducts()
    const mobile=products.filter((products)=>{
        return products.category=="mobile"
    })
    res.json({mobile: mobile})
})
router.get('/airdopes', async (req, res) => {

    const products = await services.getAllProducts()
    const airdopes=products.filter((products)=>{
        return products.category=="airdopes"
    })
    res.json({airdopes: airdopes})
})
router.get('/shoes', async (req, res) => {

    const products = await services.getAllProducts()
    const shoes=products.filter((products)=>{
        return products.category=="shoes"
    })
    res.json({shoes: shoes})
})
router.get('/watches', async (req, res) => {

    const products = await services.getAllProducts()
    const watches=products.filter((products)=>{
        return products.category=="watches"
    })
    res.json({watches: watches})
})

router.get('/:name', async (req, res) => {

    const product = await services.getProductByName(req.params.name)
    if (product.length == 0) {
        res.status(404).json('No records with given name :' + req.params.name)
    }
    else {
        res.json({product:product})
    }
})

module.exports = router;