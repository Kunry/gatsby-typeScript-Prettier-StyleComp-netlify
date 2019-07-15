exports.handler = function(event, context, callback) {
    console.log(Object.keys(typeof this.process));
    callback(null, {
    statusCode: 200
    });
}