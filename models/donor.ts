import mongoose from "mongoose";
mongoose
  .connect(
    "mongodb+srv://rayhan:rayhan123@cluster0.helgf.mongodb.net/rokto-app"
  )
  .then(() => console.log("Database connected"))
  .catch((e) => console.log("Error connecting db", e.message));

const donorSchema = new mongoose.Schema({
  location: {
    name: String,
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Donor = mongoose.model("Donor", donorSchema);
