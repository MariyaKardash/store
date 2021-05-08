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

productRouter.post('/', isAuth, expressAsyncHandler(async (req,res) => {
    const product = new Product({
        name: 'Бла-бла',
        description: 'Здесь будет описание',
        category: 'Категория1',
        brand: 'Найк',
        image: 'https://st2.depositphotos.com/3489481/5208/i/600/depositphotos_52086275-stock-photo-book-of-life.jpg',
    })
    const createdProduct = await product.save();
    if (createdProduct) {
        res
          .status(201)
          .send({ message: 'Товар создан', product: createdProduct });
      } else {
        res.status(500).send({ message: 'Произошла ошибка, попробуйте снова!' });
      }
}))

export default productRouter;