export const validateEmail = (e) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(e);
};

export const validateUsername = (e) => {
  const usernameRegex =
    /^(?!.*[\sğüşöçİĞÜŞÖÇ])(?!.*([._-]){2})[a-zA-Z0-9]+([._-]?[a-zA-Z0-9])*$/;
  return usernameRegex.test(e);
};
