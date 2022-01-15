const fs = require("fs");

/****************************Get User******
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
    // user already exists
    success = false;
  } else {
    users.push({
      id,
      name,
      cash: cash || 0,
      credit: credit || 0,
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
/*****************************Transfer Cash ************************/
const transferCash = (fromId, toId, cashAmount) => {
  let success = false;
  let users = loadUsers();
  let transferFrom = users.find((user) => {
    return user.id === parseInt(fromId);
  });
  let transferTo = users.find((user) => {
    return user.id === parseInt(toId);
  });

  if (transferFrom && transferTo && cashAmount < transferFrom.cash) {
    transferFrom.cash -= cashAmount;
    transferTo.cash += cashAmount;
    saveUsers(users);
    success = true;
  }
  return success;
};
/*****************************Transfer Credit ************************/
const transferCredit = (fromId, toId, creditAmount) => {
  let success = false;
  let users = loadUsers();
  let transferFrom = users.find((user) => {
    return user.id === parseInt(fromId);
  });
  let transferTo = users.find((user) => {
    return user.id === parseInt(toId);
  });

  if (transferFrom && transferTo && creditAmount < transferFrom.credit) {
    transferFrom.credit -= creditAmount;
    transferTo.credit += creditAmount;
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
  transferCash,
  transferCredit,
};
