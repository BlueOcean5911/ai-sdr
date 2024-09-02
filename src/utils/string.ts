export const contain = (str: string, searchStr: string): boolean => {
  return str.toLowerCase().includes(searchStr.toLowerCase());
};

export const containsLetter = (str: string) => {
  // Regular expression to check for at least one letter
  const regex = /[a-zA-Z]/;
  return regex.test(str);
};

export const removeSpecialCharacters = (str: string) => {
  // Regular expression to match special characters
  return str.replace(/[^a-zA-Z0-9]/g, "");
};
