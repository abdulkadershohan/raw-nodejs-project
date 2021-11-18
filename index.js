// dependencies
const http = require('http');
const { handleReqRes } = require('./Helpers/handlerReqRes');
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
app.handelReqResponce = handleReqRes;

// start the server
app.createServer();
