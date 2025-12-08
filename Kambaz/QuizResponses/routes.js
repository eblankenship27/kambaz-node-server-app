import QuizResponsesDao from "./dao.js";
export default function QuizResponsesRoutes(app) {
    const dao = QuizResponsesDao();
    const findQuizResponsesForUserAndQuiz = async (req, res) => {
        const { userId, quizId } = req.params;
        const quizResponses = await dao.findQuizResponsesForUserAndQuiz(userId, quizId);
        res.json(quizResponses);
    }
    const createQuizResponse = async (req, res) => {
        const quizResponse = {
            ...req.body,
        };
        const newQuizResponse = await dao.createQuizResponse(quizResponse);
        res.send(newQuizResponse);
    }
    const deleteQuizResponse = async (req, res) => {
        const { quizResponseId } = req.params;
        const status = await dao.deleteQuizResponse(quizResponseId);
        res.send(status);
    }
    const updateQuizResponse = async (req, res) => {
        const { quizResponseId } = req.params;
        const quizResponseUpdates = req.body;
        const status = await dao.updateQuizResponse(quizResponseId, quizResponseUpdates);
        res.send(status);
    }
    app.put("/api/quiz-responses/:quizResponseId", updateQuizResponse);
    app.delete("/api/quiz-responses/:quizResponseId", deleteQuizResponse);
    app.post("/api/quiz-responses", createQuizResponse);
    app.get("/api/quiz-responses/user/:userId/quiz/:quizId", findQuizResponsesForUserAndQuiz);
}