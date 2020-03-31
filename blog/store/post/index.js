import axios from "axios";

export const state = () => ({
  keywords: null,
  title: null,
  description: null
});

export const mutations = {
  SET_BLOG(state, data) {
    state.keywords = data.keywords;
    state.title = data.title;
    state.description = data.description;
  }
};

export const actions = {
  async init_post({ commit }, data) {
    commit("SET_BLOG", data);
  }
};
