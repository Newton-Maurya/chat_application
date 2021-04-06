const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const parser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 3000


// Static Middleware 
app.use('/static', express.static(path.join(__dirname, 'static'))) 
app.use(express.urlencoded())
app.use(express.json())
// View Engine Setup 

app.set('views', path.join(__dirname, './views')) 
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.status(200).render('form');
});

app.post('/Chat_Application', (req, res) => {
    inputName = req.body.name;
    
    res.redirect('/Chat_Application')
})
app.get('/Chat_Application', (req,res) => {
    res.status(200).render('index', {count:userName.length+1})
})


var inputName
const userData = {};
const userName = [];
io.on('connection', (socket) => {
    console.log(inputName);
    console.log("connected");
    userData[socket.id] = inputName
    userName.push(inputName)
    const count = userName.length
    console.log("The joined user is", userName);
    socket.broadcast.emit('new-user', inputName)
    socket.broadcast.emit('online-counter', count)


    socket.on('send', (message)=>{
        socket.broadcast.emit('receive', {'message':message, 'name':userData[socket.id]})
    });

    socket.on('disconnect', () => {
        for (let i = 0; i < userName.length; i++) {
            if (userName[i] === userData[socket.id]) {
                userName.splice(i, 1)
                break;
            }
        }
        console.log(userName);
        const count = userName.length
        console.log('user disconnected', userData[socket.id]);
        delete userData[socket.id]
        socket.broadcast.emit('online-counter', count)
    });
});

http.listen(port, () => {
    console.log('listening on *:3000');
});
