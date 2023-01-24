const fs = require("fs");
const data = require("./data.json");

//----------------Code for read file async
fs.readFile("./data.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("Error reading file from disk:", err);
    return;
  }
  try {
    const data = JSON.parse(jsonString);
    console.log("Async data",data.firstname)
  } catch (err) {
    console.log("Error parsing JSON string:", err);
  }
});

console.log("Deepanshu");
//----------------Run file in sync way
try {
  // Note that jsonString will be a <Buffer> since we did not specify an
  // encoding type for the file. But it'll still work because JSON.parse() will
  // use <Buffer>.toString().
  const jsonString = fs.readFileSync("./data.json");
  const data_sync = JSON.parse(jsonString);
  console.log("Sync data",data_sync)
} catch (err) {
  console.log(err);
  return;
}


//--------------Read file with function
function jsonReader(filePath, cb) {
  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      return cb && cb(err);
    }
    try {
      const object = JSON.parse(fileData);
      return cb && cb(null, object);
    } catch (err) {
      return cb && cb(err);
    }
  });
}
jsonReader("./data.json", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Reader",data[0].lastname); // => "Infinity Loop Drive"
});


//-----------Write a file
const dataString = {
  "firstname": "DEEP",
  "lastname": "ANSHU",
  "runs": 800,
  "iplTeam": "Raj",
  "wickets": 59,
  "matchPlayed": 23
}
// const jsonString = JSON.stringify(customer);
// fs.writeFile('./data.json', jsonString, err => {
//   if (err) {
//       console.log('Error writing file', err)
//   } else {
//       console.log('Successfully wrote file')
//   }
// })

//-----------Add one more data in data.json
fs.readFile("./data.json",(err,jsonString) => {
  if (err) {
    console.log("Error reading file from disk:", err);
    return;
  }
  try {
    const data = JSON.parse(jsonString);
    data.push(dataString);
    fs.writeFile("./data.json", JSON.stringify(data), err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully data added in file')
        }
      })
  } catch (err) {
    console.log("Error parsing JSON string:", err);
  }
})