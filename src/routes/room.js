const express = require('express')
const multer = require('multer')

const { roomPage, sendMessage } = require('./controllers/roomController')
const { authRequired } = require('./midleware/authRequired')

const upload = multer({ storage: multer.memoryStorage() })
const router = express.Router()

router.get('/lobby/:room',
   [authRequired],
   roomPage
)


router.post('/lobby/:room',
   [authRequired],
   upload.single('file'),
   sendMessage
)

module.exports = router