const express = require('express')
const router = express.Router()
const commentController = require('../controllers/comment') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.post('/', ensureAuth, commentController.postComment)

module.exports = router