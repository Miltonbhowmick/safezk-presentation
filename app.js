const client = require("@mailchimp/mailchimp_marketing");

const express = require("express");
const request = require("request");
const app = express();
const path = require("path");

const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

client.setConfig({
  apiKey: "fb84aa23c984c85c66939f891fda24bd-us21",
  server: "us21",
});

const subscribeToEmail = async (email) => {
  const response = await client.lists
    .addListMember("22b4b152c7", {
      email_address: email,
      status: "subscribed",
    })
    .then((data) => {})
    .catch((e) => {
      console.log(e);
    });
};

app.post("/api/subscription/", (req, res) => {
  const { email, js } = req.body;

  const mcData = JSON.stringify({
    email_address: email,
    status: "subscribed",
  });

  if (email) {
    subscribeToEmail(email);
  }
  res.status(200).send();
  res.end();

});

app.listen(port, () => console.log("Server is listening on port" + port));
