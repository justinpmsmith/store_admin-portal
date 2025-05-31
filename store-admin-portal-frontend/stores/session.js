import { defineStore } from 'pinia';

const useSessionStore = defineStore('session', {
  state: () => ({
    apiToken: '',
    lastSelectedCategory: ''
  }),
  getters: {
    getApiToken: (state) => state.apiToken,
    getLastSelectedCategory: (state) => state.lastSelectedCategory
  },
  actions: {
    setApiToken(token) {
      this.apiToken = token;
    },
    setLastSelectedCategory(category) {
      this.lastSelectedCategory = category;
    }
  },
  persist: {
    // storage: sessionStorage ,  // default is localStorage
    paths: ['apiToken', 'lastSelectedCategory']    // specify which state properties to persist
  }
});

export default useSessionStore;