exports.handler = function(event, context, callback) {
    console.log(this.config);
    console.log(JSON.stringify(this));
    callback(null, {
    statusCode: 500,
    body: "ERROR: NO PEPE"
    });
}