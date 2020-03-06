const mongoose = require("mongoose");
const { Schema } = mongoose;
// jos tarvitaan täällä
// const validator = require("validator")

const schemaDefaults = {
  status: {
    values: ["pending", "listed", "sold"],
    defaultValue: "pending"
  },
  margin: {
    values: [0.1, 0.2, 0.3],
    default: 0.1
  }
};

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 400
  },
  price: {
    type: Number,
    required: true
  },
  margin: {
    type: Number,
    default: schemaDefaults.margin.defaultValue,
    enum: schemaDefaults.margin.values
  },
  /* TODO
  owner: {
    // Reference to user-schema
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  */
  status: {
    type: String,
    trim: true,
    lowercase: true,
    default: schemaDefaults.status.defaultValue,
    enum: schemaDefaults.status.values
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  dateSold: {
    type: Date,
    required: false
  }
});

itemSchema.virtual("links").get(function() {
  return [
    {
      self: "http://localhost:5000/api/items/" + this._id
    }
  ];
});

itemSchema.set("toJSON", {
  virtuals: true
});

module.exports = mongoose.model("Item", itemSchema);
