const loginButton = document.querySelector('#loginButton');

// signin event listener
loginButton.addEventListener('click', async () => {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  const body = new FormData();
  body.append('email', email);
  body.append('password', password);

  const responseRow = await fetch(document.URL, {
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

  const content = await responseRow;

    // if user entered invalid data, validation error message
    if (content.status === 401) {
      document.querySelector('.validation').innerText = 'Invalid email or password';
      return null;
    }

  // if user entered valid data, redirect on lobby page
  if (content.success) {
    window.location.href = '/lobby';
  }
});
