export const contain = (str: string, searchStr: string): boolean => {
  return str.toLowerCase().includes(searchStr.toLowerCase());
};
