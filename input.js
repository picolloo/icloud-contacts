const parse = require("csv-parse")
const fs = require("fs")

const getFileData = file => {
  return new Promise((resolve, reject) => {

    fs.readFile(file, (err, data) => {
      if (err) {
        return reject(err);
      }

      resolve(getData(data))
    })
  })
}

const getData = async data => {
  let records = []

  await parse(data, {
    delimiter: ';'
  }, function (err, recs) {
    if (err)
      return console.error(err)

    records = recs
  })

  return records
}

module.exports = async function (file) {
  try {
    let records = await getFileData(file)

    records.shift()

    const persons = []

    records.map(record => {
      const name = record[0]
      const birth = record[1]
      const phone = record[2]

      if (name && birth && phone) {
        persons.push({
          name: `${name} - ${birth}`,
          phone
        })
      }
    })

    return persons
  } catch (e) {
    console.error(e)
  }
}


