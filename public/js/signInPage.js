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
  }).then((response) => response.json()).catch(console.error);

  const content = await responseRow;

  // if user entered valid data, redirect on lobby page
  if (content.success) {
    window.location.href = '/lobby';
  }

  // if user entered invalid data, validation error message
  if (content.error) {
    document.querySelector('.validation').innerText = 'Invalid email or password';
    return null;
  }
});
