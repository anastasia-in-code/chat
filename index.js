require('dotenv').config()
const PORT = process.env.PORT || 3000

const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')

const dbStart = require('./helpers/dbStart')

const authRouter = require('./src/routes/auth')
const lobbyRouter = require('./src/routes/lobby')
const roomRouter = require('./src/routes/room')

const { handleClientErrors } = require('./src/routes/midleware/handleClientErrors')
const { handleServerErrors } = require('./src/routes/midleware/handleServerErrors')

const app = express()

const server = require('http').createServer(app);
const io = require('socket.io')(server);


io.on('connection', socket => {
   console.log('connected')
   socket.on('message', data => {
      console.log(data)
   })
})

const hbs = exphbs.create({
   defaultLayout: 'main',
   extname: 'hbs'
})

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

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
