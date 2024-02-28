import { createStore } from '@shared/lib/helpers';

const useStore = createStore('user', {
  state: () => ({
    isAuth: false,
  }),
  getters: {
    // используем как computed свойство
    authorizationLabel: (state) => state.isAuth ? 'login' : 'logout'
  },
  actions: {
    updateIsAuth(payload: boolean) {
      this.isAuth = payload;
    }
  }
});

export default {
  useStore
};
