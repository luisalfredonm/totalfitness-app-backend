const mongoose = require("mongoose");

const clientSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
       required: [true, "Please add a name"],
      trim: true,
    },
   
    // phone: {
    //   type: String,
    //   required: [true, "Please add the email"],
    //   trim: true,
    // },
    // rol: {
    //   type: String,
    //   required: [true, "Please add a rol"],
    //   trim: true,
    // },
   
  },
  {
    timestamps: true,
  }
);

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;