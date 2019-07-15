const Gotrue = require("gotrue-js");

const auth = new Gotrue({
  APIUrl: "https://sleepy-kepler-5e395e.netlify.com/.netlify/identity",
  audience: "",
  setCookie: false
})

exports.handler = function(event, context, callback) {
  console.log("--------------");
  console.log(auth.currentUser());
  console.log("--------------");
  const {body} = event;
  console.log(body);
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({"input": {"app_metadata": {"authorization": {"roles": ["admin"]}}}})
  });
};
