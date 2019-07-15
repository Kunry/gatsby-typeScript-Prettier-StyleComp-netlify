

exports.handler = function(event, context, callback) {
  console.log("--------------");
  console.log(Object.values(event));
  console.log(Object.values(context));
  const {body} = event;
  body.app_metadata.authorization.roles = ["admin"]
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(event.body)
  });
};
