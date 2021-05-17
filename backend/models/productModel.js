import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, default: 0.0, required: true },
    countInStock: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0.0 },
    numReviews: { type: Number, default: 0 },
    screenResolution: { type: String, required: true },
    operationSystem: { type: String, required: true },
    cores: { type: Number, default: 4, required: true },
    memory: { type: Number, default: 16, required: true },
    camera: { type: Number, default: 12, required: true },
    battery: { type: Number, default: 1200, required: true },
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", productSchema);
export default Product;
