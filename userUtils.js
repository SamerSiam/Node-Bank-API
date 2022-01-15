const fs = require("fs");

/****************************Get User******
 * returns boolean if user exists or not
 */
const getUser = (id) => {
  const users = loadUsers();
  const userExists = users.find((user) => {
    return user.id === parseInt(id);
  });
  return userExists;
};

/************************Add user************************** */
const addUser = (id, name, cash, credit) => {
  let success = true;
  let users = loadUsers();

  if (getUser(id)) {
    success = false;
  } else {
    users.push({
      id,
      name,
      cash,
      credit,
    });
    saveUsers(users);
    success = true;
  }
  return success;
};
/********************************************* */
const saveUsers = function (users) {
  const dataJSON = JSON.stringify(users);
  fs.writeFileSync("users.json", dataJSON);
};
const loadUsers = function () {
  try {
    const dataBuffer = fs.readFileSync("users.json");
    // this will reduce another step of string parsing
    //const dataBuffer = fs.readFileSync("users.json",'utf-8');

    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch (e) {
    return [];
  }
};
/*****************************Cash Deposit ************************/
const cashDeposit = (id, cashAmount) => {
  let success = false;
  let users = loadUsers();
  let userExists = users.find((user) => {
    return user.id === parseInt(id);
  });
  if (userExists) {
    userExists.cash += cashAmount;
    saveUsers(users);
    success = true;
  }
  return success;
};

/*****************************Update Credit ************************/
const updateCredit = (id, creditAmount) => {
  let success = false;
  let users = loadUsers();
  let userExists = users.find((user) => {
    return user.id === parseInt(id);
  });
  if (userExists && creditAmount > 0) {
    userExists.credit += creditAmount;
    saveUsers(users);
    success = true;
  }
  return success;
};
/*****************************Withdraw Credit ************************/
const withdrawCredit = (id, creditAmount) => {
  let success = false;
  let users = loadUsers();
  let userExists = users.find((user) => {
    return user.id === parseInt(id);
  });
  if (userExists && creditAmount < userExists.credit) {
    userExists.credit -= creditAmount;
    saveUsers(users);
    success = true;
  }
  return success;
};
/*****************************Withdraw Cash ************************/
const withdrawCash = (id, cashAmount) => {
  let success = false;
  let users = loadUsers();
  let userExists = users.find((user) => {
    return user.id === parseInt(id);
  });
  if (userExists && cashAmount < userExists.cash) {
    userExists.cash -= cashAmount;
    saveUsers(users);
    success = true;
  }
  return success;
};
/******************************************** */
module.exports = {
  getUser,
  addUser,
  loadUsers,
  cashDeposit,
  updateCredit,
  withdrawCredit,
  withdrawCash,
};
