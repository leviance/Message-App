let createNewAccount = (req, res) => {
  res.status(200).send("thanh cong");
  console.log(req.body);
}

module.exports = {
  createNewAccount: createNewAccount
}