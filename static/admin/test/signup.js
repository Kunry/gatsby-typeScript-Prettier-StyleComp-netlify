auth.signup("pepe2@ironhack.com", "12345678")
    .then(user => {
        localStorage.setItem("gotrue.user", JSON.stringify({
            app_metadata, created_at, confirmed_at, email, id, user_metadata
          }));
        localStorage.setItem(
          "netlify-cms-user",
          JSON.stringify({ backendName: "git-gateway" })
        );
    })