const express = require("express");
const app = express();
// THIS IS HELPING TO READ THE :: "POST REQUEST BODY".
app.use(express.json());

// CROSS ORIGIN REQUEST ENABLING.
const cors = require("cors");
app.use(cors());

const { addMessage, selectAllMessage } = require("./user");

app.get("/messages", async (req, res) => {
  const list = await selectAllMessage();
  res.json(list);
});

app.post("/add-messages", async (req, res) => {
  const message = req.body;
  await addMessage(message);
  res.json({ message: "Message Sent Successfully" });
});

app.listen(4000, () => console.log("this is optional, server started"));
