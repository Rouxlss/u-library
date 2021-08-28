require('dotenv').config();

const app = require("./app");
require('./database');

async function main () {
    await app.listen(4000);
    console.log('Server on port 40000')
}

main();


git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Rouxlss/u-library.git
git push -u origin main
