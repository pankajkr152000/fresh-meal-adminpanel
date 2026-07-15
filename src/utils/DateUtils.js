export const toDate = (value) => {
  if (!value) return null;

  return value instanceof Date ? value : new Date(value);
};

export const toIsoString = (date) => {
  if (!date) return null;

  return date.toISOString();
};
