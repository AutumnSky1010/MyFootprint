import { defineStore } from "pinia";
import type { Timeline } from "../models/timeline";

export const useTimelineStore = defineStore("TimelineStore", {
  // TODO: 現在は決め打ちだが将来的にはサーバからデータを取得する
  state: (): Timeline => ({
    date: new Date("2024-01-01"),
    entries: [
      {
        title: "自宅",
        description: "",
        duration: {
          start: new Date("2024-01-01T10:00:00"),
          end: new Date("2024-01-01T12:00:00")
        },
        type: 'place',
        relatedInformation: {
          companies: [],
          realEstates: []
        }
      },
      {
        title: "研究室へ移動",
        description: "",
        duration: {
          start: new Date("2024-01-01T13:00:00"),
          end: new Date("2024-01-01T14:00:00")
        },
        type: 'move',
        relatedInformation: {
          companies: [1],
          realEstates: [1, 2]
        }
      },
      {
        title: "東京都市大学 計算機ソフトウェア研究室",
        description: "",
        duration: {
          start: new Date("2024-01-01T14:00:00"),
          end: new Date("2024-01-01T23:00:00")
        },
        type: 'place',
        relatedInformation: {
          companies: [2],
          realEstates: []
        }
      },
      {
        title: "帰宅",
        description: "",
        duration: {
          start: new Date("2024-01-01T23:00:00"),
          end: new Date("2024-01-01T23:50:00")
        },
        type: 'move',
        relatedInformation: {
          companies: [1],
          realEstates: [1, 2]
        }
      },
      {
        title: "自宅",
        description: "",
        duration: {
          start: new Date("2024-01-01T23:50:00"),
          end: new Date("2024-01-01T23:59:00")
        },
        type: 'place',
        relatedInformation: {
          companies: [],
          realEstates: []
        }
      },
    ]
  }),
  getters: {
    getTimelineState: (state) => {
      return state;
    }
  }
});