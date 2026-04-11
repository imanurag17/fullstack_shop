const express = require('express')
const router = express.Router()

const prodController = require('../controllers/prod')
const isAuth = require('../middleware/is-auth')

// POST /productInfo
router.post('/productInfo', isAuth, prodController.postCreateProduct)

// GET /products
router.get('/products', prodController.getAllProducts)

// PUT /updateProduct
router.put('/updateProduct', isAuth, prodController.putUpdateProduct)

//DELETE /deleteProduct
router.delete('/deleteProduct', prodController.deleteProduct )

//POST /addToCart
router.post('/addToCart', isAuth, prodController.postAddToCart)

//GET /getCart
router.get('/getCart', isAuth, prodController.getCart)

//POST /updateCart
router.post('/updateCart', prodController.updateCart)

module.exports = router