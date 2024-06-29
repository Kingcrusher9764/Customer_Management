# Customer_management (with MERN stack)

## Technologies Used:

- React
- Node.js
- Express.js
- MongoDB

## Steps to setup env variable:

- first create a `.env` varaible in `api` and `UI` folder
- In `.env` of `api` paste
  ````MONGO_URI=mongodb://127.0.0.1:27017/customerDB
   PORT=5000```
  ````
- In `.env` of `UI` paste
  `VITE_API_URL=http://localhost:5000`

## Steps to run the program:

- First start a terminal with `api` as root directory in it.
- Execute `sh npm install` command to install the dependencies of server
- Then run `sh node server.js` command to start the backend server

- Then start another terminal with `UI` as root directory in it.
- Execute `sh npm install` command to install the dependencies of UI
- Then run `sh npm run dev` command to start the frontend server

- When both the server started successfully navigate to `http://localhost:5173` on the browser

## dependencies

- Node.js must be installed in your system
- MongoDB must be installed in your system and make sure that the MongoDB server is running.
