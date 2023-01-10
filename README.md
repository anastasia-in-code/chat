Here is my first project) It's a live chat based on socket.io
Users can text and share pictures in real time

Here are some tips, these can help you start the project.

.env file is required with following values:

1. DBPATH with path and credentials
2. SECRETKEY - use random value
you can find the file named 'config.example', feel free to use it as a template

Repository with files and logcatalog will be created automatically

Script to start the application:
"npm run dev"

Applcation routes:
1. auth - registration and authenticaiton related pages (signIn, sigOut and signUp)
2. lobby - lobby page where all available rooms are listed and new one can be created
3. room - page for massage and files sharing
