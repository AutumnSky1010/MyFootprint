import type { Company, CompanyId, RealEstate, RealEstateId, RelatedInformation, RelatedInformationRef } from "~/composables/models/relatedInformation";

interface CompanyDictionary {
  [key: CompanyId]: Company
}

interface RealEstateDictionary {
  [key: RealEstateId]: RealEstate
}

interface State {
  companies: CompanyDictionary
  realEstates: RealEstateDictionary
}

export const useRelatedInformationStore = defineStore("RelatedInformationStore", {
  state: (): State => ({
    companies: {
      1: {
        name: "株式会社おいしいパラダイス",
        website: "about:blank",
      },
      2: {
        name: "東京都市大学",
        website: "https://www.tcu.ac.jp/",
      },
    },
    realEstates: {
      1: {
        name: "やばすぎマンション 101号室",
        value: 1,
        website: "about:blank",
        address: "東京都やばすぎ区やばすぎ町1-1-1"
      },
      2: {
        name: "やばすぎマンション 11101号室",
        value: 10000000000,
        website: "about:blank",
        address: "東京都やばすぎ区やばすぎ町1-1-1"
      }
    },
  }),
  getters: {
    getRelatedInformation: (state) => {
      return (id: RelatedInformationRef): RelatedInformation => {
        const companies: Company[] = []
        const realEstates: RealEstate[] = []
        for (const companyId of id.companies) {
          const company = state.companies[companyId]
          if (company) {
            companies.push(company)
          }
        }
        for (const realEstateId of id.realEstates) {
          const realEstate = state.realEstates[realEstateId]
          if (realEstate) {
            realEstates.push(realEstate)
          }
        }
        return {
          companies,
          realEstates
        }
      }
    }
  }
})