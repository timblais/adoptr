const express = require('express')
const router = express.Router()
const upload = require("../middleware/multer");
const postsController = require('../controllers/posts') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureAuth, postsController.getNewPost)
router.post('/', ensureAuth, upload.single("file"), postsController.createNewPost)

module.exports = router