// import the express library
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;
const currentTime = new Date();
const newFolder = "./textFolder";
console.log(currentTime);

if (!fs.existsSync(newFolder)) {
  fs.mkdirSync(newFolder);
}

app.post("/createFile", (req, res) => {
  const currentTime = new Date();
  const year = currentTime.getFullYear().toString();
  const month = (currentTime.getMonth() + 1).toString();
  const date = currentTime.getDate().toString();
  const hrs = currentTime.getHours().toString();
  const min = currentTime.getMinutes().toString();
  const sec = currentTime.getSeconds().toString();
  const milliSec = currentTime.getMilliseconds().toString();
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
  fs.readdir(newFolder, (err, files) => {
    if (err) {
      res.status(500).send(`Error reading files: ${err}`);
      return;
    }
    const textFiles = files.filter((file) => path.extname(file) === ".txt");
    res.json(textFiles);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running in PORT : ${PORT}`);
});
