const connectToMongoDb = require("./db");
const express = require("express");

connectToMongoDb();
const app = express();
const port = 8080;

app.use(express.json());

app.use("/api/user", require("./routes/user"));
app.use("/api/notes", require("./routes/note"));

app.listen(port);
