import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel";
import { isAuth } from "../utils";

const productRouter = express.Router();

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);

productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.send(product);
  })
);

productRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: "Название",
      description: "Описание",
      category: "Категория",
      brand: "Фирма-изготовитель",
      image:
        "https://st2.depositphotos.com/3489481/5208/i/600/depositphotos_52086275-stock-photo-book-of-life.jpg",
    });
    const createdProduct = await product.save();
    if (createdProduct) {
      res
        .status(201)
        .send({ message: "Товар создан", product: createdProduct });
    } else {
      res.status(500).send({ message: "Произошла ошибка, попробуйте снова!" });
    }
    console.log('Был создан новый товар!');
  })
);

productRouter.put(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.brand = req.body.brand;
      product.category = req.body.category;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      product.screenResolution = req.body.screenResolution;
      product.operationSystem = req.body.operationSystem;
      product.cores = req.body.cores;
      product.memory = req.body.memory;
      product.camera = req.body.camera;
      product.battery = req.body.battery;
      const updatedProduct = await product.save();
      if (updatedProduct) {
        res.send({ message: "Товар изменён", product: updatedProduct });
      } else {
        res
          .status(500)
          .send({ message: "Произошла ошибка в обновлении товара" });
      }
    } else {
      res.status(404).send({ message: "Товар не найден!" });
    }
    console.log('Товар был изменён!')
  })
);

productRouter.delete(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deletedProduct = await product.remove();
      res.send({
        message: "Товар был успешно удалён!",
        product: deletedProduct,
      });
    } else {
      res.status(404).send({ message: "Товар не найден!" });
    }
    console.log(`Товар удалён!`)
  })
);

export default productRouter;
