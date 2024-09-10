import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://EsmatNoori:nooriesmat3@cluster0.b19pnco.mongodb.net/food-del"
    )
    .then(() => console.log("DB connected"));
};
