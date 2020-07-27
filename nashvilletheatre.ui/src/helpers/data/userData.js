import axios from 'axios';
import { baseUrl } from '../apiKeys.json';

const getUser = (id) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/user/email/${id}`)
  .then((result) => resolve(result.data))
  .catch(error => reject(error))
});

export { getUser };