import { changeStringLength } from "../constants/constants";

const removePort = () => {
  let url = window.origin;
  const startIndex = url.indexOf(':');
  const endIndex = url.length - 1;
  const newOrigin = changeStringLength(url, endIndex - startIndex);
  return newOrigin;
}

export const BASE_URL = `${removePort()}:4000`;

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
    .then((res) => {
      return _handleResponse(res);
    });
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
    .then(((res) => {
      return _handleResponse(res);
    }))
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then((res) => _handleResponse(res));
}

const _handleResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
};
