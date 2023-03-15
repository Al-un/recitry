// https://github.com/sequelize/umzug/blob/main/examples/1.sequelize-typescript/migrate.js
require("ts-node/register");
require("./src/umzug").umzugMigrator.runAsCLI();
