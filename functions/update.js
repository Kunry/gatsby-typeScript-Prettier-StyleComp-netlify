


exports.handler = async (event, context) => {
    const { identity, user } = context.clientContext;
    const userID = user.sub;
    const userUrl = `${identity.url}/admin/users/{${userID}}`;
    const adminAuthHeader = `Bearer ${identity.token}`;

    try {
        return fetch(userUrl, {
            method: "GET",
            headers: { Authorization: adminAuthHeader }
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