const connectToMongoDb = require("./db");
const express = require("express");
const cors = require ('cors');

connectToMongoDb();
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.use("/api/user", require("./routes/user"));
app.use("/api/notes", require("./routes/note"));

app.listen(port,()=>{
    console.log(`NodeRush backend is listening on http://localhost:${port}`);
});
