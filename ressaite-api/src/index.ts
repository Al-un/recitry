import { connectSequelize, getSequelizeInstance } from "@/core/db/instance";
import app from "./app";

(async () => {
  try {
    await connectSequelize(getSequelizeInstance());
  } catch (err) {
    console.error("Error when connecting to DB", err);
  }
})();

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App started, listening to port ${port}`);
});
