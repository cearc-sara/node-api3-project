const express = require('express');

const postRouter = require("./posts/postRouter")
const userRouter = require("./users/userRouter")

const server = express();


//custom middleware

function logger(req, res, next) {
  let method = req.method;
  let url = req.url;
  let current_date = new Date();
  let status = res.statusCode;

  let log = `[${current_date}] ${method}:${url} ${status}`
  console.log(log)
  
  next()
}




server.use(express.json());
server.use(logger)

server.use("/api/posts", postRouter)
server.use("/api/users", userRouter)


server.get('/', (req, res) => { 
   res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
