import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel';

const orderRouter = express.Router();

orderRouter.get('/mine', expressAsyncHandler(async (req,res) => {
    const orders = await Order.find({user: '6093b4ab5a2c769e38d0d7b6'});
    res.send(orders);
}))

orderRouter.get(
  '/:id',
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
  '/',
  expressAsyncHandler(async (req, res) => {
    const order = new Order({
      orderItems: req.body.orderItems,
      user: '6093b4ab5a2c769e38d0d7b6',
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