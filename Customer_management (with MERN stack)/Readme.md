# Customer_management (with MERN stack)

## Technologies Used:

- React
- Node.js
- Express.js
- MongoDB

## Steps to Setup Environment Variables:

- First, create a `.env` file in both the `api` and `UI` folders.

### `.env` for `api`:

````
MONGO_URI=mongodb://127.0.0.1:27017/customerDB
PORT=5000
````

### `.env` for `UI`:

````
VITE_API_URL=http://localhost:5000
````

## Steps to Run the Program:

1. **Start Backend Server:**
    - Open a terminal and navigate to the `api` directory.
    - Run the command `npm install` to install the server dependencies.
    - Then run `node server.js` to start the backend server.

2. **Start Frontend Server:**
    - Open another terminal and navigate to the `UI` directory.
    - Run the command `npm install` to install the UI dependencies.
    - Then run `npm run dev` to start the frontend server.

3. **Access the Application:**
    - When both servers have started successfully, navigate to `http://localhost:5173` in your browser.

## Dependencies

- Node.js must be installed on your system.
- MongoDB must be installed on your system, and ensure that the MongoDB server is running.
