
const socket=io("http://localhost:8000");

const audio = new Audio('../backend/ting.mp3')

const form = document.querySelector('.message-send');
const messageInput = document.getElementById('message-type-area');
const container=document.querySelector('.messages');

const Name=prompt("Enter Your Name To Join");
socket.emit('new-user-joined',Name);

const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerHTML=message;
    messageElement.classList.add(`message-${position}`);
    container.append(messageElement);

}

socket.on('user-joined',Name=>{
    append(`${Name} joined the chat`,'right');
})

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    append(`You: ${messageInput.value}`,'right');
    socket.emit('send',messageInput.value);
    messageInput.value="";
});
socket.on('message-sent',data=>{
    append(`${data.name}: ${data.message}`,'left');
})
socket.on('person-leave',(Name)=>{
    append(`${Name} left the chat`,'left');
    audio.play();
})
