import { ObjectId } from 'mongodb';
import { sanitize } from '../../../util/sanitize';

interface Course{
    name: string
    holes: number
    id?: string
}

export async function newCourse({
  name, holes = 18, id = '',
}: Course) {
  if (id === '') {
    return '';
  }

  const { course } = await import('../../../db/courseDB');

  const newCourseData = {
    name,
    holes,
    createdBy: id,
    games: [],
  };

  // @ts-ignore
  const results = await course.insertOne(newCourseData);
  const data = await course.findOne({
    _id: results.insertedId,
  });

  //   console.log(result.insertedId.toHexString());
  console.log(data);

  return sanitize(data);
}
