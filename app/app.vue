<script setup lang="ts">
import type { TimelineEntry } from '~/composables/models/timeline'
import type { RelatedInformation  } from '~/composables/models/relatedInformation'
import { useRelatedInformationStore } from '~/composables/store/relatedInformationStore'

const bottomSheetOpened = ref(false);
const openedRelatedInformation = ref<RelatedInformation | undefined>(undefined)

const relatedInformationStore = useRelatedInformationStore();

const handleEntryClick = (entry: TimelineEntry) => {
  bottomSheetOpened.value = true
  openedRelatedInformation.value = relatedInformationStore.getRelatedInformation(entry.relatedInformation)
}

</script>

<template>
  <section class="timeline-section">
    <Timeline @onEntryClick="handleEntryClick" />
    <RelatedInformationBottomSheet v-model:opened="bottomSheetOpened">
      <div>
        <RelatedInformationCompanies :companies="openedRelatedInformation?.companies ?? []" />
        <RelatedInformationRealEstates :realEstates="openedRelatedInformation?.realEstates ?? []" />
      </div>
    </RelatedInformationBottomSheet>
  </section>
</template>

<style lang="scss" scoped>
.timeline-section {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>