//importing mongoose
const mongoose = require("mongoose");
//schema

const productSchema = mongoose.Schema({
  name: { type: "string", required: true },
  category: { type: "string", required: true },
  image: { type: "string", required: true },
  color: { type: "string" },
  phoneSize: { type: "number" },
  watchSize: { type: "number" },
  strapMaterial: { type: "string" },
  shape: { type: "string" },
  body: { type: "string" },
  waterResistant: { type: "boolean" },
  camera: { type: "number" },
  battery: { type: "number" },
  touchSensor: { type: "boolean" },
  faceLock: { type: "boolean" },
  display: { type: "string" },
  storage: { type: "number" },
  phoneWeight: { type: "number" },
  watchWeight: { type: "number" },
  airpodWeight: { type: "number" },
  connectivity: { type: "number" },
  generation: { type: "number" },
  rating: { type: "number", required: true },
  bandSize: { type: "string" },
});

const ProductsModel = mongoose.model("Products", productSchema);

module.exports = { ProductsModel };
