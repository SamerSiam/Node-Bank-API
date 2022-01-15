const usersUtil = require("./userUtils");
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

/******************************get home page */
app.get("/", (req, res) => {
  res.send("This is the Home Page");
});
/******************************get all users */
app.get("/users", (req, res) => {
  res.send(usersUtil.loadUsers());
});

/******************************get user by Id */
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const user = usersUtil.getUser(userId);
  if (user) {
    res.status(201).send(user);
  } else {
    res.status(400).send(`User Not Found`);
  }
});

/****************************Add New user****************************
 */
app.post("/users", (req, res) => {
  const { id, name, cash, credit } = req.body;

  const result = usersUtil.addUser(id, name, cash, credit);
  if (result) {
    res.status(201).send(`user added successfully`);
  } else {
    res.status(400).send(`User Already Exists!`);
  }
});

/******************************account deposit (credit &cash)******
 */
app.put("/account/deposit/:type/:id/", (req, res) => {
  let result = false;
  const { type, id } = req.params;
  const { cash, credit } = req.body;

  if (type === "cash") {
    result = usersUtil.cashDeposit(id, cash);
  } else if (type === "credit") {
    result = usersUtil.updateCredit(id, credit);
  }

  if (result) {
    res.status(201).send(`funds deposit successfully`);
  } else {
    res.status(400).send(`Error unsuccessful deposit`);
  }
});

/***************************Account Withdraw (credit & cash) */
app.put("/account/withdraw/:type/:id/", (req, res) => {
  let result = false;
  const { type, id } = req.params;
  const { cash, credit } = req.body;

  if (type === "credit") {
    result = usersUtil.withdrawCredit(id, credit);
  } else if (type === "cash") {
    result = usersUtil.withdrawCash(id, cash);
  }

  if (result) {
    res.status(201).send(`funds withdrawn successfully`);
  } else {
    res.status(400).send(`Error withdrawing funds!`);
  }
});

/****************Server Listener ***********/
app.listen(PORT, () => {
  console.log(`listentinig to port: ${PORT}`);
});
