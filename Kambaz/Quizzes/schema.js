import mongoose from "mongoose";
const quizSchema = new mongoose.Schema(
    {
        _id: String,
        title: String,
        course: String,
        type: { type: String, enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"], default: "Graded Quiz" },
        description: String,
        published: Boolean,
        points: Number,
        assignmentGroup: { type: String, enum: ["Quizzes", "Exams", "Assignments", "Project"], default: "Quizzes" },
        assignedTo: [String],
        shuffleAnswers: Boolean,
        timeLimit: Number,
        multipleAttempts: Boolean,
        numberOfAttempts: Number,
        oneQuestionAtATime: Boolean,
        viewResponses: Boolean,
        viewResponsesAfter: Date,
        showCorrectAnswers: Boolean,
        showCorrectAnswersAfter: Date,
        requireLockdownBrowser: Boolean,
        requiredToViewResults: Boolean,
        webcamRequired: Boolean,
        lockQuestionsAfterAnswering: Boolean,
        accessCode: String,
        dueDate: Date,
        availableDate: Date,
        untilDate: Date,
        questions: [
            {
                _id: String,
                index: Number,
                title: String,
                questionText: String,
                questionType: { type: String, enum: ["multiple-choice", "true-false", "fill-in-the-blank"], default: "multiple-choice" },
                points: Number,
                choices: [
                    {
                        choiceText: String,
                        _id: String
                    }
                ],
                correctAnswer: String,
                trueFalseAnswer: Boolean,
                fillInTheBlankAnswers: [
                    {
                        answerText: String,
                        _id: String
                    }
                ]
            },
        ]
    },
    { collection: "quizzes" }
);
export default quizSchema;