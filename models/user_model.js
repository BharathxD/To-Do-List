import "dotenv/config";
import mongoose from "mongoose";

mongoose.connect(
  `mongodb+srv://Bharath_xD:${process.env.DB_PASS}@cluster0.cgaoktp.mongodb.net/todolistDB?retryWrites=true&w=majority`
);

const itemsSchema = {
  name: String,
  time: String,
};

export default mongoose.model("Item", itemsSchema);
