import mongoose from "mongoose";
import quizResponseSchema from "./schema.js";
const model = mongoose.model("QuizResponseModel", quizResponseSchema);
export default model;