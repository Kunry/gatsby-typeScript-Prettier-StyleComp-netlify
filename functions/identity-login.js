exports.handler = function(event, context, callback) {
    console.log(Object.keys(this.console));
    console.log(Object.keys(this.gc));
    console.log(Object.keys(this.global));
    console.log(Object.keys(this.pr));
    console.log(Object.keys(this));
    callback(null, {
    statusCode: 500
    });
}