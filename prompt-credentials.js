const icloud = require("./iCloud-API/main");
const prompt = require("prompt");

const handle2FA = async mycloud => {
  if (mycloud.twoFactorAuthenticationIsRequired) {
    prompt.get(["security code"], async function (err, input) {
      if (err) return console.error(err);

      mycloud.securityCode = input["security code"];
    });
    return false;
  }
  console.log("You're go to go");
  return true;
};

const session_file = "./session.json";

module.exports = function login() {
  return new Promise(function (resolve, reject) {
    prompt.start();

    const mycloud = new icloud(session_file);

    mycloud.on("ready", async function () {
      if (await handle2FA(mycloud)) resolve(mycloud);
    });

    mycloud.on("err", async function (err) {
      if (err.errorCode == 6) {
        console.error("Session expired or not valid");
      } else if (err.errorCode == 7) {
        console.error("Wrong credentials");
        console.log("\nPlease log in with your credentials! (Username = Mail)");

        prompt.get(
          {
            properties: {
              username: {
                pattern: /^.*$/,
                message: "Mail",
                required: false
              },
              password: {
                required: false,
                hidden: true
              }
            }
          },
          function (err, input) {
            if (err) return console.error(err);

            // This creates your iCloud instance
            var myCloud = new icloud(
              session_file,
              input.username,
              input.password
            );

            myCloud.on("ready", async function () {
              const isAutheticated = await handle2FA(myCloud);
              if (isAutheticated) {
                resolve(myCloud);
              }
            });

            myCloud.on("sessionUpdate", function () {
              myCloud.saveSession();
            });
          }
        );
      }
    });
  });
};
