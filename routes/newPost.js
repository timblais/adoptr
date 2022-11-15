const express = require('express')
const router = express.Router()
const postsController = require('../controllers/posts') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureAuth, postsController.getNewPost)
router.post('/', ensureAuth, postsController.createNewPost)

module.exports = router
