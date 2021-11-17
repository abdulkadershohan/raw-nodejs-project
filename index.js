// dependencies
const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');
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
    // requrest handel

    // get the url and parse it
    const parseUrl = url.parse(req.url, true);
    const path = parseUrl.pathname;
    const trimendPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parseUrl.query;
    const reqHeadersObject = req.headers;

    const decoder = new StringDecoder('utf-8');
    let realData = '';

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });
    req.on('end', () => {
        realData += decoder.end();
        console.log(realData);
        console.log(method);
        // responce handel
        res.end('hello world');
    });
};

// start the server
app.createServer();
