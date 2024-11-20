export const saveState = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getState = (key) => {
  const savedState = localStorage.getItem(key);
  return savedState ? JSON.parse(savedState) : null;
};
