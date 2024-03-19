// import the express library
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;
const currentTime = new Date();
const newFolder = "./textFolder";

if (!fs.existsSync(newFolder)) {
  fs.mkdirSync(newFolder);
}

// const year = currentTime.getFullYear();
// const month = currentTime.getMonth() + 1;
// const date = currentTime.getDate();
// const hrs = currentTime.getHours();
// const min = currentTime.getMinutes();
// const sec = currentTime.getSeconds();
// const milliSec = currentTime.getMilliseconds();
// const day = currentTime.getDay();

// const fileName = `${year}${month}${date}${hrs}${min}${sec}${milliSec}`;
// console.log(fileName);

app.post("/createFile", (req, res) => {
  const year = currentTime.getFullYear();
  const month = currentTime.getMonth() + 1;
  const date = currentTime.getDate();
  const hrs = currentTime.getHours();
  const min = currentTime.getMinutes();
  const sec = currentTime.getSeconds();
  const milliSec = currentTime.getMilliseconds();
  //   const day = currentTime.getDay();

  const fileName = `${year}${month}${date}${hrs}${min}${sec}${milliSec}`;
  const filePath = path.join(newFolder, `${fileName.toString()}.txt`);
  fs.writeFile(filePath, currentTime.toISOString(), (err) => {
    if (err) {
      res.status(500).send(`Error creating File: ${err}`);
      return;
    }
    res.status(200).send(`File created Successfully:${fileName}`);
  });
});

app.get("/getFiles", (req, res) => {
  fs.readFile("");
});

app.listen(PORT, () => {
  console.log(`Server is running in PORT : ${PORT}`);
});
