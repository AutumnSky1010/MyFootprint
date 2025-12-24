<script setup lang="ts">
import type { TimelineEntry } from '~/composables/models/timeline'
import type { RelatedInformation  } from '~/composables/models/relatedInformation'
import { useRelatedInformationStore } from '~/composables/store/relatedInformationStore'
import { useUserInterestStore } from '~/composables/store/userInterestStore'

const bottomSheetOpened = ref(false);
const initialized = ref(false);
const openedRelatedInformation = ref<RelatedInformation | undefined>(undefined)

const relatedInformationStore = useRelatedInformationStore()
const userInterestStore = storeToRefs(useUserInterestStore())
const handleEntryClick = (entry: TimelineEntry) => {
  bottomSheetOpened.value = true
  openedRelatedInformation.value = relatedInformationStore.getRelatedInformation(entry.relatedInformation)
}

</script>

<template>
  <div class="app">
    <Transition name="page-transition" mode="out-in">
      
      <InitializationInitializePanel 
        v-if="!initialized" 
        @complete="initialized = true" 
      />

      <section v-else class="initialized-section">
        <section class="timeline-section">
          <Timeline @onEntryClick="handleEntryClick" />
          <RelatedInformationBottomSheet v-model:opened="bottomSheetOpened">
            <div>
              <RelatedInformationCompanies 
                v-if="userInterestStore.getInterest.value.companies" 
                :companies="openedRelatedInformation?.companies ?? []" 
              />
              <RelatedInformationRealEstates 
                v-if="userInterestStore.getInterest.value.realEstates" 
                :realEstates="openedRelatedInformation?.realEstates ?? []" 
              />
            </div>
          </RelatedInformationBottomSheet>
        </section>
      </section>

    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.app {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.initialized-section,
.timeline-section {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* --- アニメーション定義 --- */
.page-transition-enter-active,
.page-transition-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.page-transition-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-transition-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>