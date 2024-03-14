const db = require('../db')

module.exports.getAllProducts = async () => {
    const [records] = await db.query("SELECT * FROM products")
    return records
}

module.exports.getProductById = async (id) => {
    const [record] = await db.query("SELECT * FROM products WHERE id=?", [id])
    return record
}
module.exports.getProductByName = async (name) => {
    const [record] = await db.query("SELECT * FROM products WHERE name=?", [name])
    return record
}
module.exports.deleteProduct = async (id) => {
    const [{ affectedRows }] = await db.query("DELETE  FROM products WHERE id=?", [id])
    return affectedRows
    // delete
}
module.exports.addOrUpdateProduct = async (obj, id = 0) => {
    const [[[{ affectedRows }]]] = await db.query("CALL usp_product_add_or_edit(?,?,?,?,?,?,?,?,?)", [id, obj.name, obj.category, obj.size, obj.color, obj.quantity, obj.image, obj.price, obj.desp])
    return affectedRows
}
