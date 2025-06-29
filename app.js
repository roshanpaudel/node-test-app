import express from "express";
import path from "path";

//Finds the root path of the current project
const __dirname = path.resolve();
const app = express();
const PORT = 8000;

//Serve static file from public directory
app.use(express.static(path.join(__dirname, "public")));

//user home controller
app.get("/", (req, res, next) => {
  console.log("Home page request");
  //sendFile method require complete file path
  //path.join used for cross compatility for path convention in different OS
  res.sendFile(path.join(__dirname, "src/index.html"));
});

//user login controller
app.get("/login", (req, res, next) => {
  console.log("login request");
  res.sendFile(path.join(__dirname, "src/login.html"));
});
//user register controller
app.get("/register", (req, res, next) => {
  console.log("Register request");
  res.sendFile(path.join(__dirname, "src/index.html"));
});

//response JSON from server
app.get("/get-user", (req, res) => {
  res.json({
    fName: "Roshan",
    lName: "Paudel",
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server is running at http://localhost:${PORT}`);
});
