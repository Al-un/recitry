import { initSequelize, sequelize } from "./core/db/instance";
import { faireUnPouet } from "@al-un/ressaite-core/pouet";
import app from "./app";

(async () => {
  try {
    await initSequelize(sequelize);
  } catch (err) {
    console.error("Error when connecting to DB", err);
  }
})();

const port = 8000;
app.listen(port, () => {
  faireUnPouet();
  console.log("Ready to plop!");
});
