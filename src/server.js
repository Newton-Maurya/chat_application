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

app.set('views', path.join(__dirname, '../views')) 
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.status(200).render('form');
});

app.post('/Chat_Application', (req, res) => {
    inputName = req.body.name;
    userName_id = req.body.username;
    var data = [
        {count:namesData.length+1},
        {name:namesData},
        {userName:userName_List},
        {OurName:inputName}
        
    ]
    res.status(200).render('index', {data:data})
})
// app.get('/Chat_Application', (req,res) => {
// })

var userName_id;
var inputName;
const userName_Obj1 = {};
const userName_Obj2 = {};


userName_List = [];
const userPA = {};
const userData = {};
const namesData = [];

io.on('connection', (socket) => {
    // console.log(inputName);
    console.log("connected");
    userData[socket.id] = inputName;
    userPA[inputName] = socket.id;
    namesData.push(inputName);
    
    userName_List.push(userName_id)
    userName_Obj1[userName_id] = socket.id;
    userName_Obj2[socket.id] = userName_id;
    // console.log(userName_List);
    // console.log(userName_Obj1);
    // console.log(userName_Obj2);
    
    console.log(userName_Obj1);
    console.log(userPA);

    const count = namesData.length;
    // console.log("The joined user is", namesData);
    // to(userPA[namesData[1]])


    socket.broadcast.emit('new-user', {'name':inputName, 'username':userName_id, 'length':count});
    socket.broadcast.emit('online-counter', {'count':count});


    socket.on('send', (message)=>{
        console.log(`This code is working ${message.message} and ${message.user_name}`);
        if(message.user_name === "public_group"){
            console.log("THis is public Group", message.user_name);
            socket.broadcast.emit('receive', {'message':message.message, 'name':userData[socket.id], 'socketID':userPA[inputName], 'to_name':message.user_name});
        }
        else{
            socket.to(userName_Obj1[message.user_name]).emit('receive', {'message':message.message, 'name':userData[socket.id], 'to_name':userName_Obj2[socket.id]});
        }
    });

    socket.on('disconnect', () => {
        for (let i = 0; i < namesData.length; i++) {
            if(userName_List[i] === userName_Obj2[socket.id]) {
                userName_List.splice(i, 1)
                if (namesData[i] === userData[socket.id]) {                    
                    namesData.splice(i, 1)
                    break;
                }
                break;
            }
        }
        console.log(namesData);
        console.log(userName_List);

        const count = namesData.length
        // console.log('user disconnected', userData[socket.id]);
        delete userData[socket.id]
        socket.broadcast.emit('online-counter', {'count': count});
        socket.broadcast.emit('user_disconnect', {'user_id':userName_Obj2[socket.id]});

    });
});

http.listen(port, () => {
    console.log('listening on http://localhost:3000');
});
