import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter";
import orderRouter from "./routers/orderRouter";
import productRouter from "./routers/productRouter";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.use((err, req, res, next) => {
  const status = err.name && err.name === "ValidationError" ? 400 : 500;
  res.status(status).send({ message: err.message });
});

async function start() {
  try {
    await mongoose
      .connect(
        "mongodb+srv://MariyaKardash:Mariya22@cluster0.pozfc.mongodb.net/store",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
        }
      )
      .then(() => {
        console.log("Связь с бд прошла успешно!");
      });
    app.listen(5000, () => {
      console.log("Сервер запущен...");
    });
  } catch (error) {
    console.log(error);
  }
}

start();
