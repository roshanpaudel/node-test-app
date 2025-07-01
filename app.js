import express from "express";
import path from "path";
import fs from "fs";

//Finds the root path of the current project
const __dirname = path.resolve();
const app = express();
const PORT = 8000;
const fileName = "userList.csv";

const verifyLogin = (data, email, password) => {
  const individualLogin = data
    .split("\n")
    .map((item) => item.substring(item.indexOf(",") + 1));
  return individualLogin.includes(`${email},${password}`);
};

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

app.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  fs.readFile(path.join(__dirname, fileName), "utf8", (error, data) => {
    if (error) console.log(error);
    else if (verifyLogin(data, email, password)) res.redirect("/");
    else res.sendFile(path.join(__dirname, "src/loginFailed.html"));
  });
});
//user register controller
app.get("/register", (req, res, next) => {
  console.log("Register request");
  res.sendFile(path.join(__dirname, "src/register.html"));
});
app.post("/register", (req, res, next) => {
  const { name, email, password } = req.body;
  const str = `${name},${email},${password}\n`;

  fs.appendFile(fileName, str, (error) => {
    error ? res.send(error.message) : res.redirect("/");
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
