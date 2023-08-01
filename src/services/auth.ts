import {removeWindowClass} from '@app/utils/helpers';

export const loginByAuth = async (email: string, password: string) => {
  const response = await fetch('http://localhost:5279/Auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (response.ok) {
    const token = data.token;
    localStorage.setItem('token', token);
    removeWindowClass('login-page');
    removeWindowClass('hold-transition');
    return token;
  } else {
    throw new Error(data.message);
  }
};

export const registerByAuth = async (email: string, password: string) => {
  const token = 'I_AM_THE_TOKEN';
  localStorage.setItem('token', token);
  removeWindowClass('register-page');
  removeWindowClass('hold-transition');
  return token;
};
