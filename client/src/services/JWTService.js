const BASE_URL = 'http://localhost:3000';

const apiServiceJWT = {};

apiServiceJWT.register = (user) => {
  return fetch(`${BASE_URL}/register`, {
    method: 'POST',
    // credentials: 'include',
    //mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export default apiServiceJWT;