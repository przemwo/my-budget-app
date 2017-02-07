import axios from 'axios';

const API_URL = 'http://localhost:3001/';
// const API_URL = 'http://localhost:3003/api/';

class projectApi {
  static getCategories() {
    return axios.get(API_URL + 'categories').then(res => {
      return res.data;
    });
  }

  static updateCategory(categoryId, category) {
    return axios.put(API_URL + 'categories/' + categoryId, category).then(res => {
      return res.data;
    });
  }


  static getSpendings() {
    return axios.get(API_URL + 'spendings').then(res => {
      return res.data;
    });
  }

  static addSpending(spending) {
    delete spending._id;
    return axios.post(API_URL + 'spendings', spending).then(res => {
      return res.data;
    });
  }

  static deleteSpending(spendingId, spending) {
    return axios.put(API_URL + 'spendings/' + spendingId, spending).then(res => {
      return res.data;
    });
  }

  static updateSpending(spendingId, spending) {
    return axios.put(API_URL + 'spendings/' + spendingId, spending).then(res => {
      return res.data;
    });
  }

  static getIncomings() {
    return axios.get(API_URL + 'incomings').then(res => {
      return res.data;
    });
  }

  static addCategory(category) {
    delete category._id;
    return axios.post(API_URL + 'categories', category).then(res => {
      return res.data;
    });
  }

  static deleteCategory(categoryId) {
    console.log(categoryId);
    return axios.patch(API_URL + 'categories/' + categoryId, { status: 'deleted'}).then(res => {
      return res.data;
    });
  }
}


export default projectApi;
