exports.handler = function(event, context, callback) {
    console.log("--------------");
    console.log(Object.values(this.process));
    callback(null, {
    statusCode: 200
    });
}