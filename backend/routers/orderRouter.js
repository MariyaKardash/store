import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel';

const orderRouter = express.Router();

orderRouter.post('/', expressAsyncHandler(async (req,res) => {
const order = new Order({
    orderItems: req.body.orderItems,
    // user: req.user._id,
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemsPrice: req.body.itemsPrice,
    taxPrice: req.body.taxPrice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice,
});
    const createdOrder = await order.save();
    res.status(201).send({message: 'Новый заказ был создан!', order: createdOrder})
})
);

export default orderRouter;