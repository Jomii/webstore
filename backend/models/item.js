const mongoose = require("mongoose");
const { Schema } = mongoose;
const { User } = require("./user");
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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  status: {
    type: String,
    trim: true,
    lowercase: true,
    default: schemaDefaults.status.defaultValue,
    enum: schemaDefaults.status.values,
    validate: {
      validator: val => {
        for (let i = 0; i < schemaDefaults.status.values.length; i++) {
          if (val === schemaDefaults.status.values[i] || val === "") {
            return true;
          }
        }

        return false;
      },
      message: `Status must be one of: "${schemaDefaults.status.values.join(
        '", "'
      )}"`
    }
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

module.exports.Item = mongoose.model("Item", itemSchema);
