import { ObjectId } from 'mongodb';
import { sanitize } from '../../../util/sanitize';

export async function getMyCourses(id) {
  const { course } = await import('../../../db/courseDB');

  // Look up course by user id
  const courses = await course.find({
    createdBy: new ObjectId(id),
  }).toArray();

  const courseData = courses.map((c) => sanitize(c));

  console.log('courses', courses);

  return courseData;
}
