const express = require("express");
const axios = require("axios")
const app = express();
const bodyParser = require('body-parser');


const port = 5000;
const APP1 = 'https://nowdir.falconfusa.now.sh/'
const APP2 = 'https://backlog-search-service.ripicea.now.sh/'

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
  const message = requestMessage.replace("　", " ").split(' ');

  const sw = (message[0] === '課題くれ')

  axios.post(sw ? APP2 : APP1, {"request": sw ? ' ': message[0]} ).then(
    response =>{
      console.log(response.data.response)
      if(response.data.response.length !== 0){
        res.send({
          "message": response.data.response.join(' '),
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
