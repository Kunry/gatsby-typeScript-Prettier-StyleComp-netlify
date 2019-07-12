exports.handler = function(event, context, callback) {
    console.log(Object.keys(this));
    callback(null, {
    statusCode: 500
    });
}