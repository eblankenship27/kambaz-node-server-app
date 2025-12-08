import { v4 as uuidv4 } from 'uuid';
import model from './model.js';
export default function QuizzesDao() {
    async function findQuizzesForCourse(courseId) {
        const quizzes = await model.find();
        return quizzes.filter((quiz) => quiz.course === courseId);
    }
    function createQuiz(quiz) {
        const newQuiz = { ...quiz, _id: uuidv4() };
        return model.create(newQuiz);
    }
    function deleteQuiz(quizId) {
        return model.deleteOne({ _id: quizId });
    }
    function updateQuiz(quizId, quizUpdates) {
        return model.updateOne({ _id: quizId }, { $set: quizUpdates });
    }
    return {
        findQuizzesForCourse,
        createQuiz,
        deleteQuiz,
        updateQuiz,
    }
}