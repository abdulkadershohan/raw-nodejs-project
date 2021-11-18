// module scaffolding
const handler = {};
handler.notFoundHandler = (requestProperties, callback) => {
    console.log(requestProperties);
    callback(404, {
        message: 'not found url',
    });
};

module.exports = handler;
