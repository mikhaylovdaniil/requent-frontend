export const capitalized = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const isMenuItem = (word) => {
  return word.charAt(0) == "@" ? true : false;
};
