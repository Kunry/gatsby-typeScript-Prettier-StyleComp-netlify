exports.handler = async (event, context) => {
  const { identity, user } = context.clientContext;
  const userID = user.sub;
  const usersUrl = `${identity.url}/admin/users`;
  const adminAuthHeader = "Bearer " + identity.token;

  try {
    return fetch(usersUrl, {
      method: "POST",
      headers: { Authorization: adminAuthHeader },
      body: JSON.stringify({
        email: "pepe@ironhack.com",
        password: "12345678",
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log("Created a user! 204!");
        console.log(JSON.stringify({ data }));
        return { statusCode: 204, body: JSON.stringify({ data }) };
      })
      .catch(e => {
        console.log(e);
      });
  } catch (e) {
    return e;
  }
};
