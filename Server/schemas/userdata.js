const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
      type:String,
      unique:true,
    },
    email: {
      type: String,
      unique: true, 
    },
    pass: {
      type:String,
      minlength: 8, 
    },
    isAdmin: {
      type:Boolean
    },
    cart: {
      type:Array
    }
  });
module.exports = UserSchema;