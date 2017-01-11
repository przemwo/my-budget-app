import axios from 'axios';
import { v4 } from 'uuid';

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

  static addSpending(spending) {
    spending.id = v4();
    return axios.post(API_URL + 'spendings', spending).then(res => {
      return res.data;
    });
  }
}

export default ProjectApi;
