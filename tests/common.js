const db = require("../db");

async function commonBeforeAll() {
  //ann daa
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

module.exports = {
  commonAfterAll,
  commonAfterEach,
  commonBeforeAll,
  commonBeforeEach,
};
