<script setup lang="ts">
import type { TimelineEntry } from '~/composables/models/timeline';

interface PropsType {
  entry: TimelineEntry
}

defineProps<PropsType>()

defineEmits<{
  onclick: []
}>()

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })
};

</script>

<template>
  <div class="timeline-entry" @click="$emit('onclick')">
    <div class="timeline-entry-container">
      <h3 class="timeline-entry-title">{{ entry.title }}</h3>
      <p class="timeline-entry-date">{{ formatTime(entry.duration.start) }} ～ {{ formatTime(entry.duration.end) }}</p>
      <p class="timeline-entry-description">{{ entry.description }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.timeline-entry {
  position: relative;
  display: grid;
  grid-template-columns: 32px 1fr;
  column-gap: 16px;
  padding: 8px;
  border-radius: 5px;

  /* 縦の点線 */
  &::before {
    content: '';
    position: absolute;
    left: 16px; // ○の中心
    top: 0;
    bottom: 0;
    border-left: 2px dotted #c7c7c7;
  }

  /* 最後の要素だけ線を途中で止めたい場合 */
  &:last-child::before {
    bottom: 50%;
  }

  &:hover {
    background-color: #f9f9f9;
  }
}

/* ○（タイムラインのポイント） */
.timeline-entry::after {
  content: '';
  position: absolute;
  left: 8px;
  top: 12px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #4285f4;
  background-color: #fff;
  z-index: 1;
}

.timeline-entry-container {
  grid-column: 2;
  
  .timeline-entry-title {
    font-size: 14px;
    font-weight: 600;
    margin: 0;
  }

  .timeline-entry-date {
    font-size: 12px;
    color: #666;
    margin: 2px 0 4px;
  }

  .timeline-entry-description {
    font-size: 13px;
    color: #333;
    line-height: 1.5;
  }
}

</style>