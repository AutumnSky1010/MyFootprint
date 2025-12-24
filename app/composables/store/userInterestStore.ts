interface State {
  companies: boolean
  realEstates: boolean
}

export const useUserInterestStore = defineStore('userInterestStore', {
  state: (): State => ({
    companies: false,
    realEstates: false
  }),
  getters: {
    getInterest: (state) => {
      return state
    }
  },
  actions: {
    toggleCompaniesInterest() {
      this.companies = !this.companies
    },
    toggleRealEstatesInterest() {
      this.realEstates = !this.realEstates
    }
  },
})