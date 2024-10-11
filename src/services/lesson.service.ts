import { StudentLesson } from '../entity/student_lesson.entity';
import { AppDataSource } from '../config/data-source';
import { Lesson } from '../entity/lesson.entity';

const lessonRepository = AppDataSource.getRepository(Lesson);
const studentLessonRepository = AppDataSource.getRepository(StudentLesson);

export const getLessonList = async (userId: string, courseId: string) => {
  const lessons = await lessonRepository.find({
    relations: ['courses', 'studentLessons', 'studentLessons.student'],
    where: { courses: { id: courseId } },
  });

  const lessonsWithDoneStatus = lessons.map(lesson => {
    const studentLesson = lesson.studentLessons.find(
      sl => sl.student.id === userId
    );
    return {
      ...lesson,
      done: studentLesson ? studentLesson.done : false,
    };
  });
  return lessonsWithDoneStatus;
};

export const getLessonById = async (id: string) =>
  await lessonRepository.findOne({ where: { id } });

export const getLessonsByCourseId = async (
  courseId: string
): Promise<Lesson[]> => {
  return lessonRepository
    .createQueryBuilder('lesson')
    .innerJoin('lesson.courses', 'course')
    .where('course.id = :courseId', { courseId })
    .getMany();
};

export const markDoneLesson = async (id: string) => {
  const studentLesson = await studentLessonRepository.findOne({
    where: { id },
    relations: ['lesson'],
  });
  if (!studentLesson) {
    return;
  }
  studentLesson.done = !studentLesson.done;
  await studentLessonRepository.save(studentLesson);
  return studentLesson;
};
