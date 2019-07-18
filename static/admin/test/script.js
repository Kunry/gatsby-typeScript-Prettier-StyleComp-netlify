const auth = new GoTrue({
  APIUrl: "https://sleepy-kepler-5e395e.netlify.com/.netlify/identity",
  audience: "",
  setCookie: false,
});

const user = auth
  .login("gabriel.cebrian@ironhack.com", "12345678")
  .then(user => {
    // importScripts("./config.yml");
    console.log("USER:", user);
    const {
        app_metadata, created_at, confirmed_at, email, id, user_metadata
      } = user;
    localStorage.setItem("gotrue.user", JSON.stringify({
        app_metadata, created_at, confirmed_at, email, id, user_metadata
      }));
    localStorage.setItem(
      "netlify-cms-user",
      JSON.stringify({ backendName: "git-gateway" })
    );
    const link = document.createElement("link");
    link.href = `./${user.app_metadata.roles[0]}.yml`;
    link.type = "text/yaml";
    link.rel = "cms-config-url";
    link.onload = function(e) {
      console.log("Loaded import: " + e.target.href);
    };
    
    
    document.head.appendChild(link);
    const cmsScript = document.createElement("script");
    cmsScript.src =
      "https://sleepy-kepler-5e395e.netlify.com/admin/test/cms.js";
    document.body.appendChild(cmsScript);

    // document.location.href = "/admin/test2";
  })
  .catch(err => {
    console.log("ERROR: ", err);
  });
