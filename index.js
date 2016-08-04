/* mysql connection stuff */
const mysql = require('mysql');
const connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'todoapp',
  host:'localhost'
});

const express = require('express');
const app = express();

/*MIDDLEWARE*/
app.use((req,res,next) =>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  next();
})

/*ROUTES*/
app.get('/', (req,res ) => res.end("hi2"));
/*app.get('/kittens',(req,res )=>res.end("MEOW"));*/

app.get('/tasks', (req, res) => {
  connection.query('SELECT * FROM tasks', (err, rows)=>{
    if(err)res.end('error in task route')
    else res.end(JSON.stringify(rows))
  })
});

app.put('/tasks/:id/:newStatus',(req,res) => {
  console.log(req);
  connection.query(`
    UPDATE tasks
    SET status='${req.params.newStatus}'
    WHERE id='${req.params.id}'`,(err, msg)=>err? console.log(err):res.json(msg))
  })

/*delete task*/
app.delete('/tasks/:id',(req,res)=>{
  console.log(req);
  connection.query(`
    DELETE FROM tasks
    WHERE id=${req.params.id}`,(err, msg)=>err? console.log(err):res.json(msg))
  })

app.post('/tasks/:desc/:uid/:status',(req,res)=>{
  connection.query(`

      INSERT INTO tasks (description,uid,status)
      VALUES('${req.params.desc}', '${req.params.uid}', '${req.params.status}')`,

          (err, dbres)=>{
            if(err)res.end('error in posting task route');
            else res.json(dbres);
          });
});

app.listen(8887,() => console.log("server listening at port 8887"));
