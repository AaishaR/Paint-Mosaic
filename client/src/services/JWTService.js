
const BASE_URL = 'http://localhost:3000/user';

const apiServiceJWT = {};

apiServiceJWT.register = async (user) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })

    return await response.json();

  } catch (error) {
    console.log(error)
    throw error;
  }
};

apiServiceJWT.login = (user) => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

};

apiServiceJWT.logout = (tokenName) => {
  localStorage.removeItem(tokenName);
};

apiServiceJWT.getUser = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: 'GET',
      headers: { 'Authorization': `${token}` }
    });

    if (response.ok) {
      return await response.json();
    } else {
      if (response.status === 401) {
        // apiServiceJWT.logout('accessToken');
        console.error('Unauthorized access. Redirecting to login page or logging out.');

      } else {
        console.error(`Error: ${response.status} - ${response.statusText}`);
      }
    }

  } catch (e) {
    throw new Error(e);
  }
}

apiServiceJWT.addFav = async (_id, artwork) => {
  try {
    const response = await fetch(`${BASE_URL}/addFav`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id, artwork }),
    });
    if (response.ok) return await response.json();
  } catch (e) {
    throw new Error(e);
  }
}

apiServiceJWT.removeFav = async (_id, artworkId) => {
  try {
    const response = await fetch(`${BASE_URL}/removeFav`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id, artworkId }),
    });
    if (response.ok) return await response.json();
  } catch (e) {
    throw new Error(e);
  }
}

apiServiceJWT.addMsg = async (username, recieverName, msg) => {
  // console.log(recieverName)
  try {
    const response = await fetch(`${BASE_URL}/addmsg`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, recieverName, msg }),
    });
    if (response.ok) return await response.json();
  } catch (e) {
    throw new Error(e);
  }
}


export default apiServiceJWT;