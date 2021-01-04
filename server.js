console.clear();
const express = require("express");
const dbConnect = require("./config/dbConnect");




const app = express();
require("dotenv").config();

// connect to DB
dbConnect();

// routes
app.use(express.json());

app.use("/",require("./routes/user"));
app.use("/", require("./routes/lawyer"));
app.use("/profile", require("./routes/profile"));
app.use("/post", require("./routes/post"));
app.use("/case", require("./routes/case"));


// server 
const PORT = process.env.PORT;
app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`server is running on ${PORT}`)
);
