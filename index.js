const express = require("express");
const axios = require("axios")
const app = express();
const bodyParser = require('body-parser');


const port = 5000;

// Body parser
app.use(bodyParser());
app.use(express.urlencoded({ extended: false }));

// Listen on port 5000
app.listen(port, () => {
  console.log(`Server is booming on port 5000
Visit http://localhost:5000`);
});

// Home route
app.get("/", (req, res) => {
  console.log("GET /")
  res.send("Welcome to a basic express App");
});

app.post("/api", (req, res) => {
  const { body } = req
  res.send(`Hello ${body.name}, you just parsed the request body!`)
})

// Mock APIs
app.get("/users", (req, res) => {
  console.log("GET /users")
  res.json([
    { name: "William", location: "Abu Dhabi" },
    { name: "Chris", location: "Vegas" }
  ]);
});

app.post("/user", (req, res) => {
  console.log("GET /user")
  const { name, location } = req.body;

  res.send({ status: "User created", name, location });
});



const Typetalk = {
  getMessage: function (e) {
    console.log(e.postData)
    var data = e.postData && JSON.parse(e.postData.getDataAsString());
    return data && data.post;
  },
  composeReplyMessage: function (message, postId) {
    var response = {
      "message" : message,
      "replyTo" : postId
    };
    return ContentService.createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

app.post("/webhook", (req, res) => {
  console.log("POST: /webhook")
  console.log(req.body.post.message)
  res.send({"message": "こんにちは", "replyTo":req.body.post.id})
  // axios.post('https://typetalk.com/api/v1/topics/142121', {
  //   typetalkToken: 'iYc5FsKInQk2VVsXAC1Hny1dkkYz4mXzISjQI1kSfHrlORS4seOvUJcQ8daCxWCW',
  //   message: req.body,
  // })
  // .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });

  // try {
  //   var post = Typetalk.getMessage(req);
  //   if (post) {
  //     //var message = createReplyMessage(post.message);
  //     const message = "こんにちは";
  //     if (message) {
  //        //curl --data-urlencode 'message=Hello, Typetalk!' 
  //       //  -d 'typetalkToken=EudOG16GP2sRCO4W2JUoiVZVOhprP1kKupUJxNAdlGZSrdZ0iq7pNS3upJQSwtdL' 
  //       //  'https://typetalk.com/api/v1/topics/142121'
          
  //        res.send(Typetalk.composeReplyMessage(message, post.id));
  //        return
  //     }
  //   }
  // } catch(ex) {
  //   res.send(Typetalk.composeReplyMessage(ex.toString(), null));
  //   return
  // }
});
