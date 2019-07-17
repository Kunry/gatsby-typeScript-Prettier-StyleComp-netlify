const auth = new GoTrue({
    APIUrl: "https://sleepy-kepler-5e395e.netlify.com/.netlify/identity",
    audience: "",
    setCookie: false
  });


  const user = auth.login("gabriel.cebrian@ironhack.com", "12345678")
    .then(user => {
      const link = document.createElement('link');
      link.rel = 'cms-config-url';

      link.type = "text/yaml"
      link.onload = function (e) { console.log('Loaded import: ' + e.target.href) };
      // importScripts("./config.yml");
      console.log("USER:", user);
      const {
        app_metadata, created_at, confirmed_at, email, id, user_metadata
      } = user;
      localStorage.setItem(
        "gotrue.user",
        JSON.stringify({ ...user })
      );
      localStorage.setItem(
        "netlify-cms-user",
        JSON.stringify({ "backendName": "git-gateway" })
      );
      switch (user.app_metadata.roles[0]) {
        case "admin":
          link.href = 'admin.yml';
          break;
        case "editor":
          link.href = 'editor.yml';
          break;
        case "pepe":
          link.href = 'pepe.yml';
          break;
      }

      document.head.appendChild(link);
      const cmsScript = document.createElement("script");
      cmsScript.src = "https://sleepy-kepler-5e395e.netlify.com/admin/test/cms.js";
      document.body.appendChild(link);


      // document.location.href = "/admin/test2";
    })
    .catch(err => {
      console.log("ERROR: ", err);
    });