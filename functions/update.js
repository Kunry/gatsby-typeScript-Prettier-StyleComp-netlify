const fetch = require("node-fetch")


exports.handler = async (event, context) => {

    console.log(event)
    console.log(context)

    const { identity, user } = context.clientContext;
    const userID = user.sub;
    const userUrl = `${identity.url}/admin/users/{${userID}}`;
    const adminAuthHeader = `Bearer ${identity.token}`;

    try {
        return fetch(userUrl, {
            method: "PUT",
            headers: { Authorization: adminAuthHeader },
            body: JSON.stringify({ role:"admin", app_metadata: { roles: ["admin"], authorization: {roles: ["pepe"]
              } } })
        })
        .then(res => res.json())
        .then(data => {
            console.info("data", JSON.stringify(data));
            return{ statusCode: 204 };
        })
        .catch(e => {
            console.info("Failed to get user! 500! Internal.");
            return { statusCode:500 , body: `Internal Servert Error: ${e}`}
        })
    } catch (e) {
        console.log("GOT HERE! 500! outer");
        return { statusCode: 500, body: "Internal Server Error: " + e };
      }
}