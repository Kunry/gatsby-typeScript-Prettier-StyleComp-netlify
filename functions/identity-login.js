
const pepe = () => {
    console.log("Llamo a pepe");
}


exports.handler = function(event, context, callback) {
  pepe();
  console.log("--------------");
  console.log(Object.values(this.process));
  callback(null, {
    statusCode: 200,
  });
};
