import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function QuizResponsesDao() {
    async function findQuizResponsesForUserAndQuiz(userId, quizId) {
        const quizResponses = await model.findOne({ userId: userId, quizId: quizId });
        return quizResponses;
    }
    function createQuizResponse(quizResponse) {
        const newQuizResponse = { ...quizResponse, _id: uuidv4() };
        return model.create(newQuizResponse);
    }
    function deleteQuizResponse(quizResponseId) {
        return model.deleteOne({ _id: quizResponseId });
    }
    function updateQuizResponse(quizResponseId, quizResponseUpdates) {
        return model.updateOne({ _id: quizResponseId }, { $set: quizResponseUpdates });
    }
    return {
        findQuizResponsesForUserAndQuiz,
        createQuizResponse,
        deleteQuizResponse,
        updateQuizResponse,
    };
}