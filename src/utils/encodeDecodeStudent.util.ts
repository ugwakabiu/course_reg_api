export const encodeStudentId = (id) => {
  return encodeURIComponent(id);
};

export const decodeStudentId = (encodedId) => {
  return decodeURIComponent(encodedId);
};
