export interface Duration {
  start: Date
  end: Date
}

export interface Timeline {
  date: Date
  entries: TimelineEntry[]
}

export type TimelineEntryType = 'move' | 'place'

export interface TimelineEntry {
  title: string
  description: string
  duration: Duration
  type: TimelineEntryType
}
