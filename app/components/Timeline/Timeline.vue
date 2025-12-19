<script setup lang="ts">
import type { TimelineEntry } from '~/composables/models/timeline'
import { useTimelineStore } from '~/composables/store/timelineStore'

defineEmits<{
  onEntryClick: [entry: TimelineEntry]
}>()

const store = useTimelineStore()
const timeline = store.getTimelineState

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<template>
  <section class="timeline">
    <div class="timeline-header">
      <h1 class="timeline-title">タイムライン</h1>
      <h2 class="timeline-date">{{ formatDate(timeline.date) }}</h2>
    </div>
    <TimelineEntry
      v-for="(entry, index) in timeline.entries"
      @onclick="() => $emit('onEntryClick', entry)"
      :key="index"
      :entry="entry"
      class="timeline-entry"
    />
  </section>
</template>

<style lang="scss" scoped>
.time-line {
  display: flex;
  flex-direction: column;
}

.timeline-header {
  text-align: center;
  margin-bottom: 24px;

  .timeline-title {
    font-size: 24px;
    font-weight: bold;
    margin: 0;
  }

  .timeline-date {
    font-size: 16px;
    color: #666;
    margin: 4px 0 0 0;
  }
}
</style>