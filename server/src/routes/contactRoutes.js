const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')
const { envoyerMessage, getTousLesMessages } = require('../controllers/contactController')

router.post('/', envoyerMessage)
router.get('/', authMiddleware, getTousLesMessages)

module.exports = router