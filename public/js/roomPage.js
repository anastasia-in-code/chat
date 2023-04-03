// eslint-disable-next-line no-undef
const socket = io();
const sendButton = document.querySelector('#sendMessage');
const chat = document.querySelector('.chat-body');
const signOut = document.querySelector('#signout');

// send new message event listener
sendButton.addEventListener('click', async () => {
  const message = document.querySelector('#messageText').value;
  const file = document.querySelector('#file');

  // clear previous validation messages if there are any
  document.querySelector('.validation').innerText = '';

  // validation of message size
  if (message.length > 1000) {
    document.querySelector('.validation').innerText = 'Must be up to 1000 characters';
    return null;
  }

  const body = new FormData();
  body.append('message', message);
  body.append('file', file.files[0]);

  const content = await fetch(document.URL, {
    method: 'POST',
    body,
  }).then((response) => {
    if (!response.ok) {
      const error = new Error(`HTTP status code: ${response.status}`);
      error.response = response;
      error.status = response.status;
      return error;
    } return response.json();
  }).catch(console.error);

  if (content.status >= 500) {
    document.querySelector('.validation').innerText = 'Sorry something went wrong. Try again';
    return null;
  }

  // delete inform message on sending the first message
  const empty = document.querySelector('.message');
  if (empty.innerText === 'There are no messages yet') {
    empty.remove();
  }

  document.querySelector('#messageText').value = '';
  document.querySelector('#file').value = '';
});

// signout button event listener
signOut.addEventListener('click', async () => {
  const responseRow = await fetch(`${window.location.origin}/signout`, {
    method: 'POST',
  }).then((response) => response.json()).catch(console.error);

  const content = await responseRow;

  if (content.success) {
    window.location.href = '/signin';
  }
});

socket.on('connect', () => {
  socket.on('message', (msg) => {
    if (document.URL.includes(msg.roomId)) {
      let newMessage = `<span class="message"><span class="user" style="color: #${msg.userColor}">${msg.userName}</span> ${msg.messageText}</span>`;
      if (msg.messageFileId) {
        newMessage += `<a href="/files/${msg.messageFileId}" target="”_blank”">${msg.messageFileName}</a>`;
      }
      chat.innerHTML += newMessage;
    }
  });
});

socket.on('disconnect', () => {
  socket.connect();
});
