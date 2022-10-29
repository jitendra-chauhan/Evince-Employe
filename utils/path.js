const fs = require("fs");
const path = require("path");

function getAllFilesFromFolder(dir) {
  let results = [];
  fs.readdirSync(dir).forEach(function (file) {
    file = dir + "/" + file;
    var stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFilesFromFolder(file));
    } else results.push(file);
  });

  return results;
}

function getFullPath(currentDir, dir) {
  return path.resolve(currentDir, dir);
}

function getFileExtension(file) {
  return path.extname(file).toLowerCase();
}

module.exports = {
  getAllFilesFromFolder,
  getFullPath,
  getFileExtension,
};
