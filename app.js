import express from "express";
const app = express();
const PORT = 8000;

app.get("/", (req, res, next) => {
  console.log("We got request");
  res.sendFile(
    "/Users/User/Documents/Dev/Dented Code/Node Projects/node-test-app/src/index.html"
  );
});
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server is running at http//localhost:${PORT}`);
});
