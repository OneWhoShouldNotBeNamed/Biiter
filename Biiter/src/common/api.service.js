/* eslint-disable */
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import {
  API_URL
} from "@/common/config";

const ApiService = { 
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
  },
  setHeader() {
    Vue.axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem('usertoken')}`;
  },

  get(resource, slug = "") {
    return Vue.axios.get(`${resource}/${slug}`).then(
      res => {
        return res.data
      }
    ).catch(e => {
      console.log(e)
    });
  },
  post(resource, params) {
    this.setHeader()
    
    return Vue.axios.post(`${resource}`, params).then(resp => {
      return resp.data
    }).catch(e => {
      return e.response
    })
  },
  put(resource, params) {
    return Vue.axios.put(`${resource}`, params).then(
      res => {
        return res.data
      }
    ).catch(e => {
      console.log(e)
    });
  },
}
export default ApiService;
