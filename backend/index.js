const io=require('socket.io')(8000,{
    cors: {
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST"]
    }
})

const users={};

io.on('connection',socket=>{
    socket.on('new-user-joined' ,name=>{
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    })

    socket.on('send',message=>{
        socket.broadcast.emit('message-sent',{message:message, name: users[socket.id]})
    })
    socket.on('disconnecting',()=>{
        socket.broadcast.emit('person-leave',users[socket.id]);
        delete users[socket.id];
    })
})