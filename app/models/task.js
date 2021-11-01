import mongoose from "mongoose";

let taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    done: {
      type: Boolean,
      required: true,
    },
    // created_at: { type: Date, default: Date.now },
    // updated_at: { type: Date, default: Date.now },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.index({ title: "text", description: "text" });

export default mongoose.model("Task", taskSchema);
