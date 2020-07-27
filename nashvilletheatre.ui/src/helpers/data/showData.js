import axios from 'axios';
import { baseUrl } from '../apiKeys.json';

const getAllShows = () => new Promise((resolve, reject) => {
	axios.get(`${baseUrl}/api/show/allshowsbydate`)
		.then((result) => resolve(result.data))
		.catch((error) => reject(error))
});

const getShow = (id) => new Promise((resolve, reject) => {
	axios.get(`${baseUrl}/api/show/${id}`)
		.then((result) => resolve(result.data))
		.catch((error) => reject(error))
});

const getShowDates = (id) => new Promise((resolve, reject) => {
	axios.get(`${baseUrl}/api/show/${id}/dates`)
		.then((result) => resolve(result.data))
		.catch((error) => reject(error))
});

const searchShows = (searchTerm) => new Promise((resolve, reject) => {
	axios.get(`${baseUrl}/api/show/search/${searchTerm}`)
		.then((result) => resolve(result.data))
		.catch((error) => reject(error))
});

export {
	getAllShows,
	getShow,
	getShowDates,
	searchShows
};
