const express = require('express')

const authController = require('../controllers/auth')

const router = express.Router()

// POST auth/signup
router.post('/signup', authController.postSignup)

//GET auth/login
router.post('/login', authController.login)

module.exports = router