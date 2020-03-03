const mongoose = require("mongoose");
// see readme.md for issues.
const userSchema = new mongoose.Schema({
  email: {
    // Add validator function.
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
});

// HATEOAS links
userSchema.virtual("links").get(function() {
  return [
    {
      self: "http://localhost:5000/api/users/" + this._id
    }
  ];
});

// Don't return password
userSchema.set("toJSON", {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.password;
  }
});

module.exports = mongoose.model("User", userSchema);
