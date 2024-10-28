import { defineStore } from 'pinia'

export const MenuStore = defineStore('MenuState', {
  state: () => ({
    isCollapse: false
  }),
  getters: {},
  actions: {
    setCollpase() {
      this.isCollapse = !this.isCollapse
    }
  }
})
