import { model, Schema } from "mongoose";

const savedProductSchema = new Schema({
  users: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    required: true,
  },
  products: {
    type: [Schema.Types.ObjectId],
    ref: "Product",
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export const savedProductModel = model("savedProduct", savedProductSchema);
