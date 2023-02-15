const createRoom = document.querySelector('#createRoom');
const listGroup = document.querySelector('.list-group');
const signOut = document.querySelector('#signout');

// event listener for create new room
createRoom.addEventListener('click', async () => {
  const newRoomName = document.querySelector('[name="newroom"]').value;

  // clear previous validation messages if there are any
  document.querySelector('.validation').innerText = '';

  // validation of new room name
  if (newRoomName.length < 4 || newRoomName.length > 20) {
    document.querySelector('.validation').innerText = 'Must be between 4 and 20 characters';
    return null;
  }

  // validatie new room name against duplicates
  const items = document.querySelectorAll('.list-group-item');
  // eslint-disable-next-line no-restricted-syntax, no-undef
  for (room of items) {
    // eslint-disable-next-line no-undef
    if (room.innerText === newRoomName) {
      document.querySelector('.validation').innerText = `Room with name "${newRoomName}" already exists`;
      return null;
    }
  }

  const body = new FormData();
  body.append('newRoom', newRoomName);

  const rawResponse = await fetch(document.URL, {
    method: 'POST',
    body,
  }).then(async (response) => {
    if (!response.ok) {
      const error = new Error(`HTTP status code: ${response.status}`);
      error.response = response;
      error.status = response.status;
      return error;
    } return response.json();
  }).catch(console.error);

  const content = await rawResponse;

  if (content.status >= 500) {
    document.querySelector('.validation').innerText = 'Sorry something went wrong. Try again';
    return null;
  }

  // draw created room on UI
  if (content) {
    // eslint-disable-next-line no-underscore-dangle
    const newRoom = `<a href="/lobby/${content.newRoom._id}" class="list-group-item">${content.newRoom.name}</a>`;
    listGroup.innerHTML += newRoom;
    document.querySelector('[name="newroom"]').value = '';
  }
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
