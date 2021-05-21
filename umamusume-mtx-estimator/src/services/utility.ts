export const tryParseInt = (s: string) => {
  try {
    const result = parseInt(s, 10);
    if (isNaN(result)) {
      return null;
    }
    return result;
  } catch {
    return null;
  }
};

export const tryParseFloat = (s: string) => {
  try {
    const result = parseFloat(s);
    if (isNaN(result)) {
      return null;
    }
    return result;
  } catch {
    return null;
  }
};
