import { createStore } from 'vuex';

export default createStore({
  state: {
    isAuthenticated: false,
    usuario: {
      id: 0,
      nome: 'Roberto',
      email: 'teste@gmail.com',
      password: 'teste',
      perfil: 'pais',
      frequenciaFeedbacks:0,
      filhos:''
    },
  },
  mutations: {
    login(state, userData) {
      state.isAuthenticated = true;
      state.usuario = userData;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.usuario = {
        id: 0,
        nome: '',
        email: '',
        password: '',
        perfil: '',
        frequenciaFeedbacks:0,
        filhos:''
      };
    },
  },
});