require('dotenv').config()
const PORT = process.env.PORT || 3000

const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')

const dbStart = require('./helpers/dbStart')

const authRouter = require('./routes/auth')
const lobbyRouter = require('./routes/lobby')
const roomRouter = require('./routes/room')

const { handleClientErrors } = require('./routes/midleware/handleClientErrors')
const { handleServerErrors } = require('./routes/midleware/handleServerErrors')

const app = express()

const server = require('http').createServer(app);
const io = require('socket.io')(server);


io.on('connection', socket => {
   console.log('connected')
})

const hbs = exphbs.create({
   defaultLayout: 'main',
   extname: 'hbs'
})

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'src/views')

app.use(authRouter)
app.use(lobbyRouter)
app.use(roomRouter)

app.use(handleServerErrors)
app.use(handleClientErrors)

dbStart()
server.listen(PORT, () => {
   console.log('Server has been started...')
})

app.set('socketio', io);
