import express from "express";
import dns from "node:dns/promises";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

import DataBase from "./src/services/database/DataBase.js";
import route from "./src/routes/services.js";
import routePath from "./src/const/routePath.js";

dotenv.config({ quiet: true });
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const port = process.env.port || 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  }),
);

app.use(routePath.WISHBOX.DASHBOARD.ROOT, route.dashboard);
app.use(routePath.WISHBOX.GALLERY.ROOT, route.gallery);
app.use(routePath.WISHBOX.PRODUCT.ROOT, route.product);
app.use(routePath.WISHBOX.AUTH.ROOT, route.auth);
app.use(routePath.WISHBOX.CONTACT.ROOT, route.contact);

DataBase()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(`Error in connecting to database: ${err}`);
  });
