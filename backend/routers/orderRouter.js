import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel';
import User from '../models/userModel';
import Product from '../models/productModel';
import { isAuth } from '../utils';

const orderRouter = express.Router();

orderRouter.get(
  '/summary',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.aggregate([
      {
        $group: {
          _id: null,
          numOrders: { $sum: 1 },
          totalSales: { $sum: '$totalPrice' },
        },
      },
    ]);
    const users = await User.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);
    const dailyOrders = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          orders: { $sum: 1 },
          sales: { $sum: '$totalPrice' },
        },
      },
    ]);
    const productCategories = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);
    res.send({ users, orders, dailyOrders, productCategories });
  })
);

orderRouter.get('/', isAuth, expressAsyncHandler(async(req, res) => {
  const orders = await Order.find({}).populate('user');
  res.send(orders);
}))

orderRouter.delete('/:id', isAuth, expressAsyncHandler(async(req,res) => {
  const order = await Order.findById(req.params.id);
  if(order) {
    const deletedOrder = await order.remove();
    res.send({message:'Заказ был успешно удалён!', product:deletedOrder});
  } else {
    res.status(404).send({message:'Заказ не найден!'})
  }
}));

orderRouter.get('/mine', isAuth, expressAsyncHandler(async (req,res) => {
    const orders = await Order.find({user: req.user._id});
    res.send(orders);
}))

orderRouter.get(
  '/:id', isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);
orderRouter.post(
  '/', isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = new Order({
      orderItems: req.body.orderItems,
      user: req.user._id,
      shipping: req.body.shipping,
      payment: req.body.payment,
      itemsPrice: req.body.itemsPrice,
      taxPrice: req.body.taxPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).send({ message: 'New Order Created', order: createdOrder });
  })
);

export default orderRouter;