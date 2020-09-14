import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import https from "https";
import { filterManufacturer } from "./filters";
Vue.use(Vuex);

export default new Vuex.Store({
  state: { userDevices: [], currUserDevice: "" },
  getters: {
    allUserDevices: (state) => state.userDevices,
    filteredByManufacturer(state) {
      return filterManufacturer(state.userDevices, state.currUserDevice);
    }
  },
  mutations: {
    setUserDevices(state, devices) {
      state.userDevices = devices;
    },
    changeCurrentDevice(state, device) {
      state.currUserDevice = device;
    }
  },
  actions: {
    getUserDevices({ commit }) {
      axios
        .get("https://localhost:5001/api/devices", {
          httpAgent: new https.Agent({
            rejectUnauthorized: false
          })
        })
        .then((devices) => {
          commit("setUserDevices", devices.data);
          console.log("UserDevices: ", devices.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  modules: {}
});
