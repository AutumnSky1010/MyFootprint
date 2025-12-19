<script setup lang="ts">
// (内容はそのまま維持)
import type { RealEstate } from '~/composables/models/relatedInformation';

interface PropsType {
  realEstates: RealEstate[]
}

defineProps<PropsType>()
</script>

<template>
  <section class="real-estates">
    <h3 class="title">関連不動産</h3>
    <div class="real-estate-list">
      <div v-for="(realEstate, index) in realEstates" :key="index" class="real-estate-item">
        <h4 class="real-estate-name">{{ realEstate.name }}</h4>
        <p class="real-estate-address">{{ realEstate.address }}</p>
        <p class="real-estate-value">価値: {{ realEstate.value }}円</p>
        <a class="real-estate-link" :href="realEstate.website">{{ realEstate.website }}</a>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.title {
  margin-bottom: 16px;
  font-size: 1.2rem;
  font-weight: bold;
}

.real-estate-list {
  display: flex;
  flex-direction: column;
  gap: 16px; 
}

.real-estate-item {
  background-color: #E7ECF0;
  border-radius: 12px;
  padding: 20px;

  .real-estate-name {
    margin: 0 0 8px 0;
    font-size: 1.1rem;
  }

  p {
    margin: 4px 0;
    font-size: 0.95rem;
    color: #555;
  }

  .real-estate-link {
    display: inline-block;
    margin-top: 8px;
    color: #0066cc;
    text-decoration: none;
    word-break: break-all;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>