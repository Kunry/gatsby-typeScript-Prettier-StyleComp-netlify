exports.handler = function(event, context, callback) {
    console.log(Object.keys(this.config));
    console.log(Object.values(this.config));
    callback(null, {
    statusCode: 500,
    body: "ERROR: NO PEPE"
    });
}