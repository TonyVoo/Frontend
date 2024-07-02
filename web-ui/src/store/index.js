import { reactive } from 'vue';

const state = reactive({
  token: localStorage.getItem('token') || null,
  email: localStorage.getItem('email') || '',
});

const getters = {
  getToken: () => state.token,
  getEmail: () => state.email
};

const mutations = {
  setToken(token) {
    state.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  },
  setEmail(email) {
    state.email = email;
    if (email) {
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('email');
    }
  }
};

const actions = {
  initialize() {
    state.token = localStorage.getItem('token');
    state.email = localStorage.getItem('email');
  },
  logout() {
    mutations.setToken(null);
    mutations.setEmail('');
  },
};

const store = {
  state,
  getters,
  mutations,
  actions
};

export default store;
