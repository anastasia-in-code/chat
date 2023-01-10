const express = require('express');
const multer = require('multer');
const { newRoomValidation } = require('./midleware/newRoomValidation');
const { authRequired } = require('./midleware/authRequired');
const { asyncWrapper } = require('./midleware/asyncWrapper')
const { lobbyPage, createNewRoom } = require('./controllers/lobbyController');

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.get(
  '/lobby',
  authRequired,
  asyncWrapper(lobbyPage),
);

router.post(
  '/lobby',
  upload.single('file'),
  authRequired,
  newRoomValidation,
  asyncWrapper(createNewRoom),

);

module.exports = router;
