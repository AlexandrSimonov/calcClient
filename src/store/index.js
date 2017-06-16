import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    title: "App",
    access_token: "",
    menu: []
  },
  mutations: {
    title(state, title) {
      state.title = title;
    },
    access_token(state, token) {
      state.access_token = token;
    },
    menu(state, menu) {
      state.menu.splice(0, state.menu.length);
      menu.forEach(el => {
        state.menu.push(el);
      });
    }
  }
});

export default store;
