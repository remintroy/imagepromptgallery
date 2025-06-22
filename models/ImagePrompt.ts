import { Schema, models, model } from "mongoose";

const ImagePromptSchema = new Schema({
  imageUrl: { type: String, required: true },
  prompt: { type: String, required: true },
  alt: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default models.ImagePrompt || model("ImagePrompt", ImagePromptSchema, "image-prompts");
