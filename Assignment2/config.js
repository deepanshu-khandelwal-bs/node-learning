const fs = require('fs');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const readLineAsync = msg => {
  return new Promise(resolve => {
    readline.question(msg, userRes => {
      resolve(userRes);
    });
  });
}

//----------------Read
function readFileData(err, json) {
  if (err) {
    console.log("Error :", err);
    return;
  }
  try {
    const dataJson = JSON.parse(json);
    console.log(dataJson);
  } catch (err) {
    return err;
  }
  startApp();
};

//-------write
function writeFileData(id,name,age, email) {
    const users = require("./data1.json");
    let user = {
      id : id,
      name: name,
      age: parseInt(age),
      email: email
    };
    users.push(user);
    fs.writeFile("./data1.json", JSON.stringify(users), err => {
      if (err) throw err; 
    console.log("User created.");
    startApp();
    });
    
};

//-----------Update
function updateFileData(id,name){
  fs.readFile("./data1.json", "utf-8", (err, data) => {
    if (err) console.log("Error:-", err);
    let arr = JSON.parse(data);
    let ids = [];
    arr.forEach((element) => {
      ids.push(element.id);
    });
    if(ids.includes(id)) {
      arr.forEach((element) => {
        if (element.id === id) {
          element.name = name;
        }
      });
      fs.writeFile("./data1.json", JSON.stringify(arr), (err) => {
        if (err) throw err;
        console.log('Data updated');
        startApp();
      });
    } else {
      console.log("User id not exist");
      startApp();
    }
    
  });
}

//------------Delete
function deleteFileData(id){
  fs.readFile("./data1.json", "utf-8", (err, data) => {
    if (err) console.log("Error:-", err);
    let arr = JSON.parse(data);
    let ids = [];
    arr.forEach((element) => {
      ids.push(element.id);
    });
    if(ids.includes(id)) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
          index = i;
          break;
        }
      }
      arr.splice(index, 1);
      fs.writeFile("./data1.json", JSON.stringify(arr), (err) => {
        if (err) throw err;
        console.log('Data Deleted');
        startApp();
      });
    } else {
      console.log("User id not exist");
      startApp();
    }
    
  });
}

const startApp = async() => {
  const operation = await readLineAsync('Operations : 1.Read 2.Write 3.Update 4.Delete ');
  if(operation == 1){
    fs.readFile("./data1.json", "utf-8", readFileData);
  }else if(operation == 2){
    const id = await readLineAsync('Enter ID : ');
    const name = await readLineAsync('Enter name : ');
    const age = await readLineAsync('Enter age : ');
    const email = await readLineAsync('Enter email : ');
    writeFileData(id,name,age,email)
  }else if(operation == 3){
    const id = await readLineAsync('Enter ID : ');
    const name = await readLineAsync('Enter name : ');
    updateFileData(id,name)
  }else if(operation == 4){
    const id = await readLineAsync('Enter ID you want to delete : ');
    deleteFileData(id);
  }else{
    console.log('User not found.')
  }
}

startApp();