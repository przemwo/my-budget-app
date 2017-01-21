import axios from 'axios';
import { v4 } from 'uuid';

const API_URL = 'http://localhost:3001/';

class projectApi {
  static getCategories() {
    return axios.get(API_URL + 'categories').then(res => {
      return res.data;
    });
  }

  static getFavouriteCategories() {
    return axios.get(API_URL + 'favouritecategories').then(res => {
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
    const timestamp = new Date();
    spending.timestamp = timestamp.getTime();
    spending.year = timestamp.getFullYear();
    spending.month = timestamp.getMonth() + 1;
    spending.day = timestamp.getDate();
    spending.status = "active";
    return axios.post(API_URL + 'spendings', spending).then(res => {
      return res.data;
    });
  }

  static deleteSpending(spendingId) {
    return axios.patch(API_URL + 'spendings/' + spendingId, { status: 'deleted'}).then(res => {
      return res.data;
    });
  }

  static updateSpendingAmount(spendingId, amount) {
    return axios.patch(API_URL + 'spendings/' + spendingId, { amount }).then(res => {
      return res.data;
    });
  }
}

export default projectApi;
