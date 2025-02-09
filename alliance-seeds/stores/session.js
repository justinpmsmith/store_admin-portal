import { defineStore } from 'pinia';

const useSessionStore = defineStore('session', {
  state: () => ({
    apiToken: ''
  }),
  getters: {
    getApiToken: (state) => state.apiToken
  },
  actions: {
    setApiToken(token) {
      this.apiToken = token;
    }
  }
});
export default useSessionStore;