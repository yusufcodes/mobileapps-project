import showToast from '../showToast';

const axios = require('axios');

export default async function createUser({
  firstName,
  lastName,
  email,
  password,
  setAccountCreated,
}) {
  const response = await axios
    .post('http://10.0.2.2:3333/api/1.0.0/user', {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    })
    .then(
      (response) => {
        if (response.status === 201) {
          // Display Toast to the user
          showToast(
            `${firstName}, your account has successfully been created!`,
          );
          setAccountCreated(true);
        }
      },
      (error) => {
        console.log(error);
      },
    );
}
