export function omitObjUtil<T, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const result = { ...obj }; // Create a shallow copy of the object
  for (const key of keys) {
    delete result[key]; // Remove the specified keys
  }
  return result;
}
