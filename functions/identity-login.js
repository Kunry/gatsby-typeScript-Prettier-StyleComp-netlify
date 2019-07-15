exports.handler = function(event, context, callback) {
    console.log(typeof this.process);
    console.log(JSON.stringify(this.process));
    callback(null, {
    statusCode: 200
    });
}