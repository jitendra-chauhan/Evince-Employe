const http = require("http");
const express = require("express");
const { getFullPath, getAllFilesFromFolder, getFileExtension } = require("./utils/path");
require('./connection/mySql')
const app = express();

// parse application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: false,
    parameterLimit: 1000000,
  })
);

// parse application/json
app.use(express.json({ limit: "50mb" }));

// All index route will be hanlded here
const fullPath = getFullPath(__dirname, "./routes");
const files = getAllFilesFromFolder(fullPath)
  .map((e) => e.replace(fullPath, ""))
  .filter((e) => getFileExtension(e) == ".js");
files.forEach((file) => {
  let routeName = file.replace(
    file.includes("/index.js") ? "/index.js" : ".js",
    ""
  );
  app.use(routeName, require(`./routes/${routeName}`));
});

const server = http.createServer(app);
server.listen(3000, function () {
  console.log(`Server listening to the port 3000`);
});