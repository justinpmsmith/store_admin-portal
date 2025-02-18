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
  },
  persist: {
    // storage: sessionStorage ,  // default is localStorage
    paths: ['apiToken']    // specify which state properties to persist
  }
});

export default useSessionStore;