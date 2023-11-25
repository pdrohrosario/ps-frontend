import { defineStore } from 'pinia'

export const useUsuarioStore = defineStore('usuario', {
  state: () => {
    return {
      isAuthenticated: false,
      usuario:  {
        id: 0,
        email: '',
        name: '',
        profile: '',
        children: '',
        feedback_frequence: 0,
        password: '',
      }
    }
  },
  actions: {
    login(state, userData) {
      state.isAuthenticated = true
      state.usuario = userData
    },
    updateUser(state, userDate){
      state.usuario = userData
    },
    logout(state) {
      state.isAuthenticated = false
      state.usuario = {
        id: 0,
        email: '',
        name: '',
        profile: '',
        children: [],
        feedback_frequence: 0,
        password: '',
      }
    }
  }
})
