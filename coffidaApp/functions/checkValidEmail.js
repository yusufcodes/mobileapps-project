// Use regex to determine if the email the user enters is correct
const checkValidEmail = (email, setValidEmail) => {
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (valid) {
    setValidEmail(true);
  } else {
    setValidEmail(false);
  }
};

export default checkValidEmail;
