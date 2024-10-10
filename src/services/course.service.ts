import { AppDataSource } from '../config/data-source';
import { Course } from '../entity/course.entity';
import { User } from '../entity/user.entity';
import { Enrollment } from '../entity/enrollment.entity';
import { StudentLesson } from '../entity/student_lesson.entity';
import { Grade } from '../entity/grade.entity';
import { UserRole } from '../enums/UserRole';
import { EnrollStatus } from '../enums/EnrollStatus';
import { AssignmentStatus } from '../enums/AssignmentStatus';

const courseRepository = AppDataSource.getRepository(Course);
const enrollmentRepository = AppDataSource.getRepository(Enrollment);
const studentLessonRepository = AppDataSource.getRepository(StudentLesson);
const gradeRepository = AppDataSource.getRepository(Grade);

export const getCourseList = async () => {
  return courseRepository.find({
    order: { name: 'ASC' },
  });
};

export const getUserCourseList = async (user: User) => {
  if (user.role === UserRole.INSTRUCTOR) {
    return courseRepository.find({
      where: [{ instructor: user }, { subInstructor: user }],
    });
  } else {
    const enrollments = await enrollmentRepository.find({
      where: { student: user },
      relations: {
        course: {
          lessons: true,
          assignment: true,
        },
      },
      order: { status: 'ASC', enrollment_date: 'DESC' },
    });
    return enrollments.map(enrollment => {
      return {
        ...enrollment.course,
        enrollStatus: enrollment.status,
      };
    });
  }
};

export const getCourseById = async (id: string) => {
  return courseRepository.findOne({
    where: { id },
    relations: ['instructor', 'subInstructor'],
  });
};

export const getCoursesByInstructorId = async (
  instructorId: string
): Promise<Course[]> => {
  return await courseRepository
    .createQueryBuilder('course')
    .where('course.instructor_id = :instructorId', { instructorId })
    .getMany();
};

export const getCourseDetails = async (
  courseId: string
): Promise<Course | null> => {
  return await courseRepository.findOne({
    where: { id: courseId },
    relations: [
      'instructor',
      'subInstructor',
      'enrollments',
      'lessons',
      'assignment',
    ],
  });
};

export const getStudentCountByCourseId = async (
  courseId: string
): Promise<number> => {
  return await enrollmentRepository.count({
    where: { course: { id: courseId } },
  });
};

export const getEnrollment = async (
  course: Course,
  student: User | undefined
): Promise<Enrollment | null> => {
  if (!student) {
    return null;
  }

  return enrollmentRepository.findOne({
    where: { course, student },
  });
};

export const enrollCourse = async (
  course: Course,
  user: User
): Promise<void> => {
  const enrollment = new Enrollment({
    course,
    student: user,
    enrollment_date: new Date(),
    status: EnrollStatus.PENDING,
  });

  await enrollmentRepository.save(enrollment);
};

export const approveEnrollment = async (
  enrollmentId: string
): Promise<void> => {
  const enrollment = await enrollmentRepository.findOne({
    where: { id: enrollmentId },
  });

  if (enrollment) {
    enrollment.status = EnrollStatus.APPROVED;
    await enrollmentRepository.save(enrollment);
  }
};

export const rejectEnrollment = async (enrollmentId: string): Promise<void> => {
  const enrollment = await enrollmentRepository.findOne({
    where: { id: enrollmentId },
  });

  if (enrollment) {
    enrollment.status = EnrollStatus.REJECTED;
    await enrollmentRepository.save(enrollment);
  }
};

export const getProgressInCourse = async (
  course: Course,
  student: User
): Promise<number> => {
  const courseDetail = await getCourseDetails(course.id);
  const lessons = courseDetail?.lessons || [];

  const totalLesson = lessons.length;
  let totalDone = 0;
  for (const lesson of lessons) {
    const studentLesson = await studentLessonRepository.findOne({
      where: { student, lesson },
    });
    if (studentLesson && studentLesson.done === true) {
      totalDone++;
    }
  }

  if (courseDetail?.assignment) {
    const gradeOfAssignment = await gradeRepository.findOne({
      where: { student, assignment: courseDetail?.assignment },
    });

    if (
      gradeOfAssignment &&
      gradeOfAssignment.status === AssignmentStatus.PASS
    ) {
      totalDone++;
    }
  } else {
    totalDone++;
  }

  return Math.floor((totalDone / (totalLesson + 1)) * 100);
};

export const getEnrollmentForInstructor = async (
  instructor: User
): Promise<Enrollment[]> => {
  const courses = await getUserCourseList(instructor);
  const enrollments: Enrollment[] = [];
  for (const course of courses) {
    const enrollmentsOfCourse = await enrollmentRepository.find({
      where: { course },
      relations: ['student', 'course'],
    });
    enrollments.push(...enrollmentsOfCourse);
  }

  return enrollments.sort((a, b) =>
    a.enrollment_date < b.enrollment_date ? 1 : -1
  );
};

export const getEnrollmentForCourse = async (
  course: Course
): Promise<Enrollment[]> => {
  return enrollmentRepository.find({
    where: { course },
    relations: ['student', 'course'],
  });
};
