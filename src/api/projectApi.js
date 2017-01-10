import axios from 'axios';

const API_URL = 'http://localhost:3001/';

class ProjectApi {
  static getCategories() {
    return axios.get(API_URL + 'categories').then(res => {
      return res.data;
    });
  }

  static getSpendings() {
    return axios.get(API_URL + 'spendings').then(res => {
      return res.data;
    });
  }
}

export default ProjectApi;
