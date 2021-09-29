// dependencies
const http = require('http');

// app object - module scaffolding
app = {};

// congiftion
app.config = {
    port: 3000,
};

// create server
app.createServer = () => {
    const server = http.createServer(app.handelReqResponce);
    server.listen(app.config.port, () => {
        console.log(`listening on port ${app.config.port}`);
    });
};

// handel requst responce
app.handelReqResponce = (req, res) => {
    // responce handel
    res.end('hello world');
};

// start the server
app.createServer();
