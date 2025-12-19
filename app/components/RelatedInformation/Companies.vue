<script setup lang="ts">
import type { Company } from '~/composables/models/relatedInformation';

interface PropsType {
  companies: Company[]
}

defineProps<PropsType>()
</script>

<template>
  <section class="companies">
    <h3 class="title">関連企業</h3>
    <div class="company-list">
      <div v-for="(company, index) in companies" :key="index" class="company-item">
        <h4 class="company-name">{{ company.name }}</h4>
        <a class="company-link" :href="company.website">{{ company.website }}</a>
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

.company-list {
  display: flex;
  flex-direction: column;
  gap: 16px; 
}

.company-item {
  background-color: #E7ECF0;
  border-radius: 12px;
  padding: 20px;

  .company-name {
    margin: 0 0 8px 0;
    font-size: 1.1rem;
    font-weight: bold;
  }

  .company-link {
    display: inline-block;
    color: #0066cc;
    text-decoration: none;
    word-break: break-all;
    font-size: 0.95rem;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>