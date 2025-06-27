import express from "express";
const app = express();
const PORT = 8000;

app.get("/", (req, res, next) => {
  console.log("We got request");
  res.send(
    `<h1>Hello from dev</h1><hr><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, voluptas?</p>`
  );
});
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server is running at http//localhost:${PORT}`);
});
