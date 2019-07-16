exports.handler = function(event, context, callback) {

    console.log(event);
    console.log(context);
    if(/(@ironhack.com)$/.test(event.body.email)){
        callback(null, {
            statusCode: 200
        });
    } else {
        callback(null, {
            statusCode: 500
        })
    }
}