const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const decodeIDToken = require('./authenticateToken');
const postsRouter = require('./controllers/posts');

const app = express();

app.use(cors());
app.use(decodeIDToken);
app.use(express.json());
var server = require('http').Server(app);
const socketio = require("socket.io")

io = socketio(server, {
    cors: {
        origin: '*',
    }
});

app.use(function (req, res, next) {
    req.io = io,
    next();
});

mongoose.connect(
    'mongodb+srv://admin:admin@cluster0.wsu3f.mongodb.net/instaclone?retryWrites=true&w=majority',
    {
        useNewUrlParser: true, useUnifiedTopology: true 
    }
).then(() => {
    console.log('Connected to database');
}).catch((err) => console.log('Error connecting database', err.message));

app.use('/posts', postsRouter)

app.get('/', (req, res) => {
    res.send('Hello Ynov Toulouse');
});

const PORT = 3001;

server.listen(PORT, () => {
    console.log(`Serveur is running on port ${PORT}`)
});