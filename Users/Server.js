const http = require('http');
const app = require('./SRC/app'); // Import the Express application

const DatabaseConnection = require('./SRC/Database/DB');
DatabaseConnection();

const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 8000; // Set the port to listen on

const server = http.createServer(app);

server.listen(port,() => {
    console.log(`Server is running on port ${port}`);
})

