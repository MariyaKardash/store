import express from 'express';
import cors from 'cors';
import data from './data';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter';
import orderRouter from './routers/orderRouter';

const app = express();

app.use(cors());
app.use(express.json());
app.get('/api/products', (req, res) => {
  res.send(data.products);
});

app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.get('/api/products/:id', (req, res) => {
  const product = data.products.find(x => x._id === req.params.id);
  if(product) {
    res.send(product);
  } else {
    res.status(404).send({message: 'Данный товар сейчас отсутствует на складе!'});
  }
})

app.use((err, req, res, next) => {
  const status = err.name && err.name === 'ValidationError'?400:500;
  res.status(status).send({message: err.message});
});

async function start () {
  try { 
    await mongoose.connect('mongodb+srv://MariyaKardash:Mariya22@cluster0.pozfc.mongodb.net/store', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }).then (() => {
      console.log('Связь с бд прошла успешно!')
    });
    app.listen(5000, () => {
      console.log('Сервер запущен...');
    });
  } catch(error) {
    console.log(error);
  }
}

start();