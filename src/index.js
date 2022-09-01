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

startDb(config.dbPath);
server.listen(config.port, () => {
  console.log('Server has been started...');
});

app.set('socketio', io);

process.on('SIGINT', () => {
  console.log('receiving SIGINT');
  server.close(() => {
    console.log('server was closed');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('receiving SIGTERM');
  server.close(() => {
    console.log('server was closed');
    process.exit(0);
  });
});
