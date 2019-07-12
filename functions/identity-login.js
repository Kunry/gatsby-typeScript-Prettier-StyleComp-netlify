exports.handler = function(event, context, callback) {
    console.log(arguments)
    // console.log(context)
    // console.log(context.done());
     const {identity, user} = context.clientContext;
     console.log(identity, user)
    callback(null, {
    statusCode: 500,
    body:{error:{msg:"No pepe"}}
    });
}