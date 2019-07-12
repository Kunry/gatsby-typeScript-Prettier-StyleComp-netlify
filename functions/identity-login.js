exports.handler = function(event, context, callback) {
    console.log(this);
    callback(null, {
    statusCode: 500,
    body: "ERROR: NO PEPE"
    });
}