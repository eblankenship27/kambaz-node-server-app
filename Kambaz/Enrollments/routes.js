import EnrollmentsDao from "./dao.js";
export default function EnrollmentsRoutes(app, db) {
    const dao = EnrollmentsDao(db);
    const findEnrollmentsForUser = (req, res) => {
        const { userId } = req.params;
        const enrollments = dao.findEnrollmentsForUser(userId);
        res.json(enrollments);
    } 
    const enrollUserInCourse = (req, res) => {
        const { courseId } = req.params;
        const userId = req.body;
        const newEnrollment = dao.enrollUserInCourse(userId, courseId);
        res.send(newEnrollment);
    };
    const createNewEnrollment = (req, res) => {
        const { courseId } = req.params;
        const user = req.body;
        const userId = user.userId
        const newEnrollment = dao.createNewEnrollment({ user: userId, course: courseId })
        res.send(newEnrollment);
    }
    const deleteEnrollment = (req, res) => {
        const { enrollmentId } = req.params;
        const status = dao.deleteEnrollment(enrollmentId);
        res.send(status);
    }
    const updateEnrollment = async (req, res) => {
        const { enrollmentId } = req.params;
        const enrollmentUpdates = req.body;
        const status = await dao.updateEnrollment(enrollmentId, enrollmentUpdates);
        res.send(status);
    }
    app.get("/api/enrollments/:userId", findEnrollmentsForUser);
    app.post("/api/courses/:courseId/enrollments", createNewEnrollment);
    app.delete("/api/enrollments/:enrollmentId", deleteEnrollment);
    app.put("/api/enrollments/:enrollmentId", updateEnrollment);
}