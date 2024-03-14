const db = require('../db')

module.exports.getAllOrders = async () => {
    const [records] = await db.query("SELECT * FROM orders")
    return records
}

module.exports.getOrderById = async (id) => {
    const [record] = await db.query("SELECT * FROM orders WHERE id=?", [id])
    return record
}
module.exports.getOrderByOrderId = async (order_id) => {
    const [record] = await db.query("SELECT * FROM orders WHERE order_id=?", [order_id])
    return record
}
module.exports.deleteOrder = async (id) => {
    const [{ affectedRows }] = await db.query("DELETE  FROM orders WHERE id=?", [id])
    return affectedRows
}
module.exports.addOrUpdateOrder = async (obj, id = 0) => {
    const [[[{ affectedRows }]]] = await db.query("CALL usp_order_add_or_edit(?,?,?,?,?,?,?,?)", [id, obj.email, obj.address, obj.price, obj.product_id, obj.phone, obj.quantity,obj.order_id])
    return affectedRows
}
