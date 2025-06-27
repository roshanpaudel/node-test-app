import express from "express";
import path from "path";

//Finds the root path of the current project
const __dirname = path.resolve();
const app = express();
const PORT = 8000;

//Serve static file from public directory
app.use(express.static(__dirname + "/public"));


app.get("/", (req, res, next) => {
  console.log("We got request");
  //sendFile method require complete file path
  res.sendFile(__dirname + "/src/index.html");
});
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server is running at http//localhost:${PORT}`);
});
