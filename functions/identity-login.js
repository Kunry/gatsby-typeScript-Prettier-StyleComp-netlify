
const pepe = () => {
    console.log("Llamo a pepe");
    console.log(window)
}


exports.handler = function(event, context, callback) {
  pepe();
  console.log("--------------");
//   console.log(Object.values(this.process));
  callback(null, {
    statusCode: 500,
    body: JSON.stringify({"error": "NOP"})
  });
};
