const axios = require('axios');

export default async function createUser(
  firstName,
  lastName,
  email,
  password,
  setAccountCreated,
  setSignupError,
) {
  try {
    const response = await axios({
      method: 'post',
      url: 'http://10.0.2.2:3333/api/1.0.0/user',
      responseType: 'json',
      data: {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      },
    });
    if (response.status === 201) {
      console.log('createUser: Account successfully created');
      setAccountCreated(true);
    } else {
      setSignupError(true);
    }
  } catch (e) {
    setSignupError(true);
    console.log(e);
  }
}
