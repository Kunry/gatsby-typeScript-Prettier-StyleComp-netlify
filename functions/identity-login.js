exports.handler = function(event, context, callback) {
    console.log(typeof this);
    callback(null, {
    statusCode: 500
    });
}