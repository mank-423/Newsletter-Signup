const mailchimp = require("@mailchimp/mailchimp_marketing");
const express = require("express");
const bodyParser = require("body-parser");
const request = require("superagent");
const https = require("https");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


mailchimp.setConfig({
    apiKey: "c07d3fbfcb85e458ae38edc1ac73deb4-us9",
    server: "us9"
});

const listId = "6cc04d27f7";

//Get to the singnup page
app.get("/", function (requ, resp) {
    resp.sendFile(__dirname + "/signup.html");
});


app.post("/", async(req, res)=>{

    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    const response = await mailchimp.lists.addListMember(listId, {
        email_address: email,
        status: "subscribed",
        merge_fields: {
            FNAME: firstName,
            LNAME: lastName
        }
    });

    res.sendFile(__dirname+"/success.html");
    
    

});



//Listening on the server
app.listen(port, function () {
    console.log("Server is runing on port 3000");
});
