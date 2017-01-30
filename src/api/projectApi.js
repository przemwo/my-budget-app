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

  static updateSpendingDay(spendingId, day) {
    return axios.patch(API_URL + 'spendings/' + spendingId, { day }).then(res => {
      return res.data;
    });
  }

  static updateSpendingDescription(spendingId, description) {
    return axios.patch(API_URL + 'spendings/' + spendingId, { description }).then(res => {
      return res.data;
    });
  }

  static updateSpendingCategory(spendingId, category) {
    return axios.patch(API_URL + 'spendings/' + spendingId, { category }).then(res => {
      return res.data;
    });
  }

  static getIncomings() {
    return axios.get(API_URL + 'incomings').then(res => {
      return res.data;
    });
  }
}

export default projectApi;
