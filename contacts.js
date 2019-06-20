const prompt = require("./prompt-credentials");

(async () => {
  const cloud = await prompt();

  console.log("Getting contacts");

  const contacts = await cloud.Contacts.list();
  console.log(contacts);
})();
