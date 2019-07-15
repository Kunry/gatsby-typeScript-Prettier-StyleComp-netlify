

exports.handler = function(event, context, callback) {
  console.log("--------------");
  console.log(Object.values(event));
  console.log(Object.values(context));
  callback(null, {
    statusCode: 200
  });
};
