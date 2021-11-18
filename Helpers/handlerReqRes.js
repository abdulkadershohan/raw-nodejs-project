// dependencies
const { StringDecoder } = require('string_decoder');
const url = require('url');
const routes = require('../Routes/routes');
const { notFoundHandler } = require('../Handler/routeHandlers/notFoundHandler');
// module scaffolding
const handler = {};

handler.handleReqRes = (req, res) => {
    // requrest handel

    // get the url and parse it
    const parseUrl = url.parse(req.url, true);
    const path = parseUrl.pathname;
    const trimendPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parseUrl.query;
    const reqHeadersObject = req.headers;

    const requestProperties = {
        parseUrl,
        path,
        trimendPath,
        method,
        queryStringObject,
        reqHeadersObject,
    };

    const decoder = new StringDecoder('utf-8');
    let realData = '';
    const chosenHandler = routes[trimendPath] ? routes[trimendPath] : notFoundHandler;
    chosenHandler(requestProperties, (statusCode, payload) => {
        statusCode = typeof statusCode === 'number' ? statusCode : 500;
        payload = typeof statusCode === 'object' ? payload : {};
        const payloadString = JSON.stringify(payload);

        res.writeHead(statusCode);
        res.end(payloadString);
    });

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });
    req.on('end', () => {
        realData += decoder.end();
        console.log(realData);
        // responce handel
        res.end('hello world');
    });
};

module.exports = handler;
