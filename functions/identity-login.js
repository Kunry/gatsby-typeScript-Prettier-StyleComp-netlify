

exports.handler = function(event, context, callback) {
  console.log("--------------");
  const {body} = event;
  body.app_metadata.authorization.roles = ["admin"]
  console.log(body);
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({"input": {"app_metadata": {"authorization": {"roles": ["admin"]}}}})
  });
};
