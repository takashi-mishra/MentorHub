const cluster = require("cluster");
const os = require("os");

if (cluster.isPrimary) {
    const cpuCount = os.cpus().length;
    console.log(`Total CPUs: ${cpuCount}`);
    console.log("Master process started...");

    for (let i = 0; i < cpuCount; i++) {
        cluster.fork();   // Create a worker for each CPU
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} crashed. Starting a new worker...`);
        cluster.fork();
    });
} else {


const express = require('express');
const proxy = require('express-http-proxy');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// testing server
app.get('/',(req,res)=>{
    res.send('API Gateway is running');
})
// Proxy requests to the user service
app.use('/users', proxy('http://localhost:4000'));
// Proxy requests to the mentor service
app.use('/mentors', proxy('http://localhost:5000'));

app.listen(PORT, () => {
    console.log(`API Gateway is running on port ${PORT}`);
})

}

