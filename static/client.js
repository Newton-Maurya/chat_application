const socket = io("http://localhost:3000");
const recmsg = document.getElementById('inputMessage');
const form = document.getElementById("form");
const message = document.getElementById('message')
var audio = new Audio();
audio.src = 'tune.mp3';
const onlinecount = document.getElementById("onlinecounter")

form.addEventListener('submit', function (event) {
    const inputmsg = recmsg.value
    event.preventDefault();
    if (inputmsg.length != 0) {
        const msgcontainer = document.createElement('h2')
        audio.play();
        msgcontainer.classList.add('sendmsg')
        msgcontainer.innerText = inputmsg;
        message.appendChild(msgcontainer)
        socket.emit('send', inputmsg)
        // onlinecount.innerText = inputmsg.length
        recmsg.value = ""
    }
    else {
        alert('Please enter something then send')
    }


})
// const name = prompt("Enter Your Name");
socket.emit('new-user-join', name)

socket.on('new-user', (name) => {
    console.log(name);
    const msgcontainer = document.createElement('h2')
    msgcontainer.innerText = `'${name}' is join the chat`

    msgcontainer.classList.add('recmsg')
    message.appendChild(msgcontainer)
});

const onlinecounter = document.getElementById('onlinecounter')
socket.on('online-counter', (count) => {
    onlinecounter.innerText = count;
});

socket.on('receive', (data) => {
    console.log(data.message)
    const msgcontainer = document.createElement('h2')
    msgcontainer.classList.add('recmsg')
    msgcontainer.innerText = `${data.name}:- ${data.message}`;
    message.appendChild(msgcontainer)    
});
