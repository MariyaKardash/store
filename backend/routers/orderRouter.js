import express, { Router } from 'express'
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel';

const orderRouter = express.Router();
orderRouter.get('/:id', expressAsyncHandler(async (req,res)=> {
    const order = await Order.findById(req.params.id);
    if(order) {
        res.send(order)
    } else {
        res.status(404).send({message: 'Данный заказ не был найден!'})
    }
}))

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