const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");

app.use(express.static("public")); // in order to include the local files such as images and css files which are static.
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const data = {
    members: [{
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  const jsonData= JSON.stringify(data);
  url =  "https://us2.api.mailchimp.com/3.0/lists/9eaa21e048";
  const options=
  {
    method: "POST",
    auth: "tilak:cc63d5a43a3f37ddc573c36337def4d3-us2"
  };

const request = https.request(url,options,function(response)
{

const status = response.statusCode;
if(status==200)
res.sendFile(__dirname + "/success.html");
else
res.sendFile(__dirname + "/failure.html");
response.on("data", function(data)
{

})
})

// request.write(jsonData); //this line can be used to check the failure, so just comment it failure check
request.end();
})

app.post("/failure", function(req,res)
{
  res.redirect("/");
})

//cc63d5a43a3f37ddc573c36337def4d3-us2
// list id  9eaa21e048
app.listen(process.env.PORT || 3000, function() {
  console.log("server started running at port 3000");
});
