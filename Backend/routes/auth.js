const express = require('express')

const authController = require('../controllers/auth')

const router = express.Router()

// POST auth/signup
router.post('/signup', authController.postSignup)

module.exports = router