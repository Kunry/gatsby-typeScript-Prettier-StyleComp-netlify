exports.handler = function(event, context, callback) {
    console.log(typeof this.process);
    console.log(this.process.config);
    callback(null, {
    statusCode: 200
    });
}