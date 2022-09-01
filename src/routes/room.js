const express = require('express');
const multer = require('multer');
const { roomPage, sendMessage } = require('./controllers/roomController');
const { authRequired } = require('./midleware/authRequired');

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

const asyncWrapper = (cb) => (req, res, next) => cb(req, res, next).catch(next);

router.get(
  '/lobby/:room',
  authRequired,
  asyncWrapper(roomPage),
);

router.post(
  '/lobby/:room',
  authRequired,
  upload.single('file'),
  sendMessage,
);

module.exports = router;
