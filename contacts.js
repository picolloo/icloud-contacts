const prompt = require("./prompt-credentials");

const addContacts = async contacts => {
  const cloud = await prompt()

  await cloud.Contacts.list()

  try {
    contacts.map(async ({ name, phone }) => {
      await cloud.Contacts.new({
        firstName: name,
        phones: [{
          label: "mobile",
          field: phone
        }]
      })

      console.debug(`User ${phone} added`)
    })
  }
  catch (e) {
    console.error(e)
  }
};


module.exports = addContacts