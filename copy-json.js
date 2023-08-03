const fs = require('fs-extra');
const path = require('path');

const sourceFilePath = path.join(__dirname, 'src', 'repositories', 'database.json');
const destinationFilePath = path.join(__dirname, 'dist', 'repositories', 'database.json');

fs.copySync(sourceFilePath, destinationFilePath);
