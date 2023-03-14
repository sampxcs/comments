# MERN Stack with MySQL Server

This project is a mern stack to add anonymous comments, Node.js is used for the backend with TypeScript, Express and MySQL for the database. to raise the MySQL server it should be done from Docker. The FrontEnd of the project is in the "client" folder, it is created with the create-react-app command and has a README.md with more instructions.

## Available Scripts

In the project directory, you can run:

### `npm dev`

script: "concurrently \"npx tsc --watch\" \"nodemon -q build/index.js\""

Runs the app in the development mode.\
Open server in [http://localhost:4000](http://localhost:4000) to view it in the browser.

### `npm test`

script: "echo \"Error: no test specified\" && exit 1"

### `npm run build`

script: "npx tsc"

Builds the app for production to the `build` folder.\
