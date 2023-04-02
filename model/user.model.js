//Importing the necessary modules

const mongoose = require("mongoose");

const cartProductSchema = mongoose.Schema({
  productId: { type: String },
  quantity: Number,
});

const favouritesProductSchema = mongoose.Schema({
  productId: { type: String },
});
const ordersProductSchema = mongoose.Schema({
  productId: { type: String },
});

//creating a schema

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    cart: {
      type: [cartProductSchema], //cart will be array, productId and quantity
      required: true,
    },
    favourites: {
      type: [favouritesProductSchema],
      required: true,
    },
    orders: {
      type: [ordersProductSchema],
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("User", userSchema);
module.exports = { UserModel };
