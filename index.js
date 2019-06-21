const csv = require("./input")
const contacts = require("./contacts")


const files = [
  "./data/test.csv"
]
// "./data/agosto.csv"
// "./data/junho.csv"
// "./data/novembro.csv"
// "./data/outubro.csv"
// "./data/setembro.csv"



const getFileContent = async file => {
  const result = await csv(file)

  Promise.all(result)

  return [...result]
}

(async files => {

  const r = await Promise.all(files.map(async file => {
    return await getFileContent(file)
    // users = users.concat(result)
  }))

  const users = [].concat.apply([], r)

  contacts(users)

})(files)





