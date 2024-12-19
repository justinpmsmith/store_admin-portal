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
      console.log("setting api token: " + this.apiToken)
    }
  }
});
export default useSessionStore;