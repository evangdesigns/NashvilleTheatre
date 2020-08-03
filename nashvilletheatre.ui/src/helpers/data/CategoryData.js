import axios from 'axios';
import {baseUrl} from '../apiKeys.json';

const getAllCategories = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/category`)
    .then((result) => resolve(result.data))
    .catch(error => reject(error))
})

const getShowsByCategory = (categoryId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/category/shows/${categoryId}`)
  .then((result) => resolve(result.data))
  .catch(error => reject(error))
});

const getTopCategories = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/category/top/categories`)
    .then((result) => resolve(result.data))
    .catch((error) => reject(error))
});

const getTopCategoriesWithShows = (categoryId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/category/top/categories/${categoryId}`)
    .then((result) => resolve(result.data))
    .catch((error) => reject(error))
});

export {
  getAllCategories,
  getTopCategories,
  getTopCategoriesWithShows,
  getShowsByCategory
 };
