const mysql = require("mysql");
const Promise = require("bluebird");
Promise.promisifyAll(require("mysql/lib/Connection").prototype);

const dbinfo = {
  host: "localhost",
  user: "root",
  password: "Pass@word",
  database: "WPTExam",
};

const selectAllMessage = async () => {
  const connection = mysql.createConnection(dbinfo);

  await connection.connectAsync();

  let sql = `SELECT * FROM messages`;
  const list = await connection.queryAsync(sql);

  await connection.endAsync();
  return list;
};

const addMessage = async (messages) => {
  const connection = mysql.createConnection(dbinfo);

  await connection.connectAsync();

  let sql = `INSERT INTO messages (message) values (?)`;
  connection.queryAsync(sql, [messages.message]);
  console.log("Record Added!");

  await connection.endAsync();
};

module.exports = { selectAllMessage, addMessage };
