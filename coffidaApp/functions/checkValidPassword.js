const checkValidPassword = (password, setValidPassword) => {
  const valid = password.length > 5;
  if (valid) {
    setValidPassword(true);
  } else {
    setValidPassword(false);
  }
};

export default checkValidPassword;
