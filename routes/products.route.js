const express = require("express");
const { ProductsModel } = require("../model/Products.model");

const productsRouter = express.Router();

productsRouter.get("/", async (req, res) => {
  try {
    const sortParam = req.query.sort; // get sorting parameter from query string
    const orderParam = req.query.order; // get ordering parameter from query string

    const sortOrder = orderParam === "desc" ? -1 : 1; // determine the sort order based on the order parameter

    const products = await ProductsModel.find().sort({
      [sortParam]: sortOrder,
    }); // sort products if a sort parameter was provided, using the sort order

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
productsRouter.get("/:_id", async (req, res) => {
  //send only one product
  try {
    const product = await ProductsModel.findById(req.params._id);
    res.send(product);
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});

//add update delete

productsRouter.post("/add", async (req, res) => {
  try {
    const product = new ProductsModel(req.body);
    await product.save();
    res.status(200).send({ msg: "A new Product has been added" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

productsRouter.patch("/update/:_id", async (req, res) => {
  const { _id } = req.params;
  const payload = req.body;
  try {
    await ProductsModel.findByIdAndUpdate({ _id: _id }, payload);
    res.status(200).send({ msg: "Product has been updated" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

productsRouter.delete("/delete/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    await ProductsModel.findByIdAndDelete({ _id: _id });
    res.status(200).send({ msg: "Product has been deleted" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

//searching with keyword

productsRouter.get("/search/:keyword", async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const regex = new RegExp(keyword, "i");
    const products = await ProductsModel.find({ name: regex });
    res.json(products);
    // res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = { productsRouter };
