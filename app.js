import express, { urlencoded } from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors'
import { corsOptions } from "./constants/config.js";
import userRoutes from './Routes/user.routes.js'
import productRoutes from './Routes/product.routes.js'
import orderRoutes from './Routes/order.routes.js'
import categoryRoutes from './Routes/category.routes.js'
import companyRoutes from './Routes/company.routes.js'
import cartRoutes from './Routes/cart.routes.js'


const app = express();

configDotenv({ path: "./.env" });

  app.use(express.urlencoded({extended: true}));
  app.use(express.json());
  app.use(cookieParser())
  app.use(cors(corsOptions));


mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("Connected to the database successfully !");

    app.listen(process.env.PORT, () => {
      console.log(`server is listening on port ${process.env.PORT}`);
    });

    app.get("/", (req, res) => {
      res.status(200).send("Hello World !");
    });
  })
  .catch((err) => {
    console.log(`Error while connecting to the database ${err}`);
  });


  app.use("/api/v1/user", userRoutes);
  app.use("/api/v1/product", productRoutes);
  app.use("/api/v1/order", orderRoutes);
  app.use("/api/v1/company", companyRoutes);
  app.use("/api/v1/category", categoryRoutes);
  app.use("/api/v1/cart", cartRoutes);

