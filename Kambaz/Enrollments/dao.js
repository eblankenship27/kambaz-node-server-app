import { v4 as uuidv4 } from "uuid";
export default function EnrollmentsDao(db) {
  function findEnrollmentsForUser(userId) {
    const { enrollments } = db;
    return enrollments.filter((e) => e.user === userId);
  }
  function createNewEnrollment(enrollment) {
    const newEnrollment = { ...enrollment, _id: uuidv4() }
    const { enrollments } = db;
    db.enrollments = [...enrollments, newEnrollment];
    return newEnrollment;
  }
  function enrollUserInCourse(userId, courseId) {
    const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
    const { enrollments } = db;
    db.enrollments = [...enrollments, newEnrollment];
    return newEnrollment;
  }
  function deleteEnrollment(enrollmentId) {
    const { enrollments } = db;
    db.enrollments = enrollments.filter((e) => e._id !== enrollmentId);
  }
  function updateEnrollment(enrollmentId, enrollmentUpdates) {
    const { enrollments } = db;
    const enrollment = enrollments.find((e) => e._id === enrollmentId);
    Object.assign(enrollment, enrollmentUpdates);
    return enrollment;
  }
  return { 
    enrollUserInCourse,
    findEnrollmentsForUser,
    deleteEnrollment,
    createNewEnrollment,

   };
}
