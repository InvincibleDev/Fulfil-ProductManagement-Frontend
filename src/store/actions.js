/* eslint-disable */
import axios from "axios";

const SITE_PREFIX = "http://127.0.0.1:8000";
// const SITE_PREFIX = "http://ec2-35-154-206-196.ap-south-1.compute.amazonaws.com";

export const actions = {

  getAllProducts: (store, paginated_url=null) =>
    new Promise((resolve, reject) => {
      let url = paginated_url ? paginated_url : SITE_PREFIX + '/product/'
      axios
        .get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    }),
  searchProducts: (store, val) =>
    new Promise((resolve, reject) => {
      axios
        .get(SITE_PREFIX + `/product/?search=${val}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    }),
    filterProducts: (store, values) =>
    new Promise((resolve, reject) => {
      axios
        .get(SITE_PREFIX + `/product/?${values.parameter}=${values.value}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    }),

    deleteProduct: (store, product_sku) =>
    new Promise((resolve, reject) => {
      axios
        .delete(SITE_PREFIX + `/product/${product_sku}/`)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    }),
    editProduct: (store, product) =>
    new Promise((resolve, reject) => {
      axios
        .patch(SITE_PREFIX + `/product/${product.product_sku}/`, product)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    }),
    addProduct: (store, product) =>
    new Promise((resolve, reject) => {
      axios
        .post(SITE_PREFIX + `/product/`, product)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    }),


    // Webhooks

    getAllWebhooks: (store, paginated_url=null) =>
    new Promise((resolve, reject) => {
      let url = paginated_url ? paginated_url : SITE_PREFIX + '/webhook/'
      axios
        .get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    }),
    deleteWebhook: (store, id) =>
    new Promise((resolve, reject) => {
      axios
        .delete(SITE_PREFIX + `/webhook/${id}/`)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    }),
    editWebhook: (store, webhook) =>
    new Promise((resolve, reject) => {
      axios
      .patch(SITE_PREFIX + `/webhook/${webhook.id}/`, webhook)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    }),
    addWebhook: (store, webhook) =>
    new Promise((resolve, reject) => {
      axios
      .post(SITE_PREFIX + `/webhook/`, webhook)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
    }),
    deleteAllProducts: (store) =>
    new Promise((resolve, reject) => {
      axios
        .delete(SITE_PREFIX + `/deleteall/`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    }),
    getTaskProgress : (store, task_id) =>
      new Promise((resolve, reject) => {
        axios
          .get(SITE_PREFIX + `/taskprogress/${task_id}/`)
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => reject(err));
      })
  };
  