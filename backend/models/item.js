// import mongoose

const itemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 400 // hardcoded length or no?
  },
  price: {
    // Different prices?
    type: Number,
    required: true
  },
  owner: {
    // Reference to user-schema
    type: ObjectId,
    ref: "User",
    required: true
  },
  status: {
    // TODO
    type: String,
    required: true
  },
  dateAdded: {
    type: Date,
    required: false // or true?
  },
  dateSold: {
    type: Date,
    required: false
  }
});

const Item = (exports.Item = mongoose.model("Items", itemSchema));
