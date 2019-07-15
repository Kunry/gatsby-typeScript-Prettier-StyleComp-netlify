exports.handler = function(event, context, callback) {
    
    console.log(Object.keys(this.process.config));
    console.log(Object.keys(this.process.domain));
    
    callback(null, {
    statusCode: 200
    });
}