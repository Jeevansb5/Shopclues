const express = require("express")
const router = express.Router()
const services = require('../services/order.services')

// http://localhost:8080/api/order/
router.get('/', async (req, res) => {
    const orders = await services.getAllOrders()
    res.send(orders)
})

router.get('/:id', async (req, res) => {

    const order = await services.getOrderById(req.params.id)
    if (order.length == 0) {
        res.status(404).json('No records with given Id :' + req.params.id)
    }
    else {
        res.json({order:order})
    }
})
router.get('/oid/:id', async (req, res) => {

    const order = await services.getOrderByOrderId(req.params.id)
    if (order.length == 0) {
        res.status(404).json('No records with given Id :' + req.params.id)
    }
    else {
        res.json({order:order})
    }
})
router.delete('/:id', async (req, res) => {

    const affectedRows = await services.deleteOrder(req.params.id)
    if (affectedRows == 0) {
        res.status(404).json('No records with given Id :' + req.params.id)
    }
    else {
        res.send('deleted succefully')
    }
})
router.post('/', async (req, res) => {
    await services.addOrUpdateOrder(req.body)
    res.status(201).json('Order Placed Succefully !!')
})
router.put('/:id', async (req, res) => {

    const affectedRows= await services.addOrUpdateOrder(req.body,req.params.id)
    if (affectedRows.length==0) {
        res.status(404).json('No records with given Id :' + req.params.id)
    }
    res.status(201).json('Updated succefully')
})

module.exports = router;