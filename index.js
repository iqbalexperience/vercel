import { writeFileSync, readFileSync } from 'fs';
import express from 'express';
const app = express();

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });

app.get('/', async (req,res)=>{
  let db = await readDB()
  res.send(db)
})

app.get('/user/:username', async (req, res)=>{
  const userName = req.params.username;
  let db = await readDB();
  db.user = userName;
  console.log(db)
  writeDB(db);
  res.send(db);
})



function writeDB(data){
  return writeFileSync('database.json', JSON.stringify(data));
}

function readDB(){
  const db = readFileSync('database.json', 'utf8')
  return JSON.parse(db)
}

app.listen(3000)
