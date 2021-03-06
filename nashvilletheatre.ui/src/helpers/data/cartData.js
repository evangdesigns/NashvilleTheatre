import axios from 'axios';
import { baseUrl } from '../apiKeys.json';

const getUsersCart = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/cart/${uid}`)
    .then((result) => resolve(result.data))
    .catch(error => reject(error))
});

const getUsersCartId = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/cart/user/${uid}`)
    .then((result) => resolve(result.data))
    .catch(error => reject(error))
});

const getLineItems = (id) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/lineitem/cart/${id}`)
  .then((result) => resolve(result.data))
  .catch(error => reject(error))
});

const getShowLineItems = (id) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/lineitem/shows/cart/${id}`)
  .then((result) => resolve(result.data))
  .catch(error => reject(error))
});

const getSubscriptionLineItems = (id) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/lineitem/subscriptions/cart/${id}`)
  .then((result) => resolve(result.data))
  .catch(error => reject(error))
});

const deleteLineItem = (id) => new Promise((resolve, reject) => {
  axios.delete(`${baseUrl}/api/lineitem/delete/${id}`)
  .then((result) => resolve(result.data))
  .catch(error => reject(error))
});

const updateQuantity = (id, quantity) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/api/lineitem/${id}/quantity/${quantity}`)
  .then((result) => resolve(result.data))
  .catch(error => reject(error))
});

const addToCart = (item) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/api/lineitem/add`, item)
  .then((result) => resolve(result.data))
  .catch(error => reject(error))
});

export {
  getUsersCartId,
  getLineItems,
  getUsersCart,
  getShowLineItems,
  getSubscriptionLineItems,
  deleteLineItem,
  updateQuantity,
  addToCart
};