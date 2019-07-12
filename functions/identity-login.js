exports.handler = function(event, context, callback) {
    console.log(Object.keys(this));
    console.log(Object.values(this));
    callback(null, {
    statusCode: 500,
    body: "ERROR: NO PEPE"
    });
}