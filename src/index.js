const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const startDb = require('./helpers/startDb');
const config = require('../config');

const authRouter = require('./routes/auth');
const lobbyRouter = require('./routes/lobby');
const roomRouter = require('./routes/room');

const { handleServerErrors } = require('./routes/midleware/handleServerErrors');
const { handleNotFound } = require('./routes/midleware/handleNotFound');

io.on('connection', () => {
  console.log('connected');
});

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'src/views');

app.use(authRouter);
app.use(lobbyRouter);
app.use(roomRouter);

app.use(handleServerErrors);
app.use(handleNotFound);

startDb(config.dbPath);
server.listen(config.port, () => {
  console.log('Server has been started...');
});

app.set('socketio', io);

const operateSignal = (signal) => {
  process.on(signal, () => {
    console.log(`receiving ${signal}`);
    server.close(() => {
      console.log('server was closed');
      process.exit(0);
    });
  });
};

operateSignal('SIGINT');
operateSignal('SIGTERM');

process.on('unhandledRejection', (err, promise) => {
  console.log('Unhandled rejection at ', promise, `reason: ${err.message}`);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.log(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});
