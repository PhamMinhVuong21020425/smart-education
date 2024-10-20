import { StudentLesson } from '../entity/student_lesson.entity';
import { AppDataSource } from '../config/data-source';
import { Lesson } from '../entity/lesson.entity';
import { Course } from '../entity/course.entity';
import { formatDateTime } from '../helpers/date.helper';

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

export const getLessonListAdmin = async (courseId: string) => {
  const lessons = await lessonRepository.find({
    relations: ['courses', 'studentLessons', 'studentLessons.student'],
    where: { courses: { id: courseId } },
    order: {
      study_time: 'ASC',
    },
  });
  const lessonsWithFormat = lessons.map(lesson => {
    return {
      ...lesson,
      studyTime: formatDateTime(lesson.study_time),
    };
  });
  return lessonsWithFormat;
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

export const createLesson = async (
  course: Course,
  title: string,
  content: string,
  file_url: string,
  study_time: Date
) => {
  const lesson = new Lesson({
    title,
    content,
    file_url,
    courses: [course],
    study_time,
  });
  return await lessonRepository.save(lesson);
};

export const updateLessonById = async (
  lessonId: string,
  courses: Course[],
  title?: string,
  content?: string,
  file_url?: string,
  study_time?: Date,
  studentLessons?: StudentLesson[]
) => {
  const lesson = await getLessonById(lessonId);
  if (!lesson) return;
  const lessonUpdate = new Lesson({
    title,
    content,
    file_url,
    courses,
    studentLessons,
    study_time,
  });
  Object.assign(lesson, lessonUpdate);
  return await lessonRepository.save(lesson);
};
