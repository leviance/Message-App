import express from 'express';

const app = express();

const port = 3000;
const host = 'localhost'

app.get("/" , (req,res) => {
  res.send("xin chao");
})

app.listen(port, () => {
  console.log("Chạy thành công");
});