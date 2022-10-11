const express = require('express');
const { handleValidationErrors } = require('./midleware/handleValidationErrors');
const { authRequired } = require('./midleware/authRequired');
const { requireName } = require('./validators');
const { lobbyPage, createNewRoom } = require('./controllers/lobbyController');

const router = express.Router();

router.get(
  '/lobby',
  authRequired,
  lobbyPage,
);

router.post(
  '/lobby',
  requireName,
  authRequired,
  handleValidationErrors('lobby', {
    title: 'Chat | Lobby',
  }),
  createNewRoom,
);

module.exports = router;
