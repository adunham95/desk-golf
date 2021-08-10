export function sanitize(obj) {
  const newObj = { ...obj };
  // Remove _id
  if (newObj._id) {
    newObj.id = newObj._id;
    delete newObj._id;
  }

  return newObj;
}
