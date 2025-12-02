import EnrollmentsDao from "./dao.js";
export default function EnrollmentsRoutes(app, db) {
    const dao = EnrollmentsDao(db);
    const findCoursesForEnrolledUser = async (req, res) => {
        let {userId } = req.params;
        if (userId === "current") {
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                req.sendStatus(401);
                return;
            }
            userId = currentUser._id;
        }
        const courses = await dao.findCoursesForUser(userId);
        res.json(courses)
    }
    const findEnrollmentsForUser = async (req, res) => {
        const { userId } = req.params;
        const enrollments = await dao.findEnrollmentsForUser(userId);
        res.json(enrollments);
    } 
    const findAllEnrollments = async (req, res) => {
        const enrollments = await dao.findEnrollments();
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
    app.get("/api/enrollments", findAllEnrollments);
    app.post("/api/courses/:courseId/enrollments", createNewEnrollment);
    app.delete("/api/enrollments/:enrollmentId", deleteEnrollment);
    app.put("/api/enrollments/:enrollmentId", updateEnrollment);
}