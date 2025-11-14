const express = require('express')
const prodController = require('../controllers/prod')

const isAuth = require('../middleware/is-auth')
const router = express.Router()

// POST /productInfo
router.post('/productInfo', isAuth, prodController.postCreateProduct)

// GET /products
router.get('/products', prodController.getAllProducts)

// PUT /updateProduct
router.put('/updateProduct', isAuth, prodController.putUpdateProduct)

//DELETE /deleteProduct
router.delete('/deleteProduct', prodController.deleteProduct )

module.exports = router