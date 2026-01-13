const { Client } = require("pg");
const fs = require("fs");
const path = require("path");
const { getDatabaseUri } = require("./config");
require("colors");

const db = new Client({ connectionString: getDatabaseUri() });

const loadSchema = async () => {
  const schemaPath = path.join(__dirname, "rate-my-setup-advance-schema.sql");
  const schemaSql = fs.readFileSync(schemaPath, "utf8");
  await db.query(schemaSql);
};

const connectWithSchema = async () => {
  try {
    await db.connect();
    console.log("Successfully connected to postgres database!".blue);
    await loadSchema();
  } catch (err) {
    console.error("connection error", err.stack);
  }
};

connectWithSchema();

module.exports = db;
