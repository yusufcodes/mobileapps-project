// Individually searches for forbidden words and returns true/false to determine for validation
const profanityFilter = (review) => {
  const checkTea = review.search('tea');
  const checkCake = review.search('cake');
  const checkPastry = review.search('pastry');
  const checkPastries = review.search('pastries');

  if (
    checkTea > -1 ||
    checkCake > -1 ||
    checkPastry > -1 ||
    checkPastries > -1
  ) {
    return true;
  }

  return false;
};

export default profanityFilter;
