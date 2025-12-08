import mongoose from "mongoose";
const quizResponseSchema = new mongoose.Schema({
    _id: String,
    quizId: { type: String, ref: "QuizModel" },
    userId: { type: String, ref: "UserModel" },
    responses: [
        {
            _id: String,
            attemptNumber: Number,
            dateTaken: Date,
            score: Number,
            answers: [
                {
                    questionId: String,
                    answer: String,
                    correct: Boolean
                },
            ],
        },
    ]
}, { collection: "quizResponses" });
export default quizResponseSchema;