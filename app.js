import express from "express";
import path from "path";
import fs from "fs";

//Finds the root path of the current project
const __dirname = path.resolve();
const app = express();
const PORT = 8000;
const fileName = "userList.csv";

//Serve static file from public directory
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

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
// app.get("/register", (req, res, next) => {
//   console.log("Register request");
//   res.sendFile(path.join(__dirname, "src/register.html"));
// });
app.post("/register", (req, res, next) => {
  const { name, email, password } = req.body;
  const str = `${name},${email},${password}\n`;
  fs.appendFile("userList.csv", str, (error) => {
    error ? console.log(error) : console.log("Details added in file");
  });

  res.sendFile(path.join(__dirname, "src/register.html"));
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
