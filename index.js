const express = require("express");
const axios = require("axios")
const app = express();
const bodyParser = require('body-parser');


const port = 5000;

const customResponseService = 'https://now-flask.onsd.now.sh/'
const backlogService = 'https://backlog-search-service.ripicea.now.sh/'

// Body parser
app.use(bodyParser());
app.use(express.urlencoded({ extended: false }));

// Listen on port 5000
app.listen(port, () => {
  console.log(`Server is booming on port 5000
Visit http://localhost:5000`);
});

app.post("/webhook", (req, res) => {
  console.log("POST: /webhook")
  console.log(req.body.post.message)
  const requestMessage = req.body.post.message;
  const requestId = req.body.post.id;
  let message = requestMessage.replace("　", " ").split(' ');
  let sendMessage = '';
  const isBacklog = (message[0] === '課題くれ')

  axios.post(isBacklog ? backlogService : customResponseService, {"request": isBacklog ? ' ': message[0]} ).then(
    response =>{
      console.log(response.data.response)
      if(response.data.response.length !== 0){
        if(response.data.response instanceof Array){
          sendMessage = response.data.response.join(' ');
        }else{
          sendMessage = response.data.response
        }
        res.send({
          "message": sendMessage,
          "replyTo":requestId
        })
      }else{
        res.end()
      }
    }
  ).catch(
    err => console.error(err)
  )
});
