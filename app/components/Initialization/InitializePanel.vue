<script setup lang="ts">
import { ref } from 'vue'
import { useUserInterestStore } from '~/composables/store/userInterestStore'

// 親コンポーネントへイベントを通知するための定義
const emit = defineEmits<{
  complete: []
}>()

const userInterestStore = useUserInterestStore()

const { getInterest } = storeToRefs(userInterestStore)

// 画面の状態管理
const currentStep = ref<'welcome' | 'selection'>('welcome')

/**
 * 選択画面へ遷移する
 */
const goToSelection = () => {
  currentStep.value = 'selection'
}

/**
 * 設定を終了し、親コンポーネントへ通知する
 */
const onFinish = () => {
  emit('complete')
}
</script>
<template>
  <div class="container">
    <Transition name="fade-slide" mode="out-in">
      <div v-if="currentStep === 'welcome'" key="welcome" class="welcome step-content">
        <h1>My Footprintへようこそ</h1>
        <p>あなたの興味に合わせて情報をカスタマイズします。</p>
        <button class="btn-primary" @click="goToSelection">次へ</button>
      </div>

      <div v-else-if="currentStep === 'selection'" key="selection" class="checkbox step-content">
        <h1>興味のある情報を選んでください</h1>

        <div class="options">
          <label class="option-item">
            <input type="checkbox" v-model="getInterest.companies" />
            <span>生活と関わりのある企業情報</span>
          </label>
          <label class="option-item">
            <input type="checkbox" v-model="getInterest.realEstates" />
            <span>不動産情報</span>
          </label>
        </div>

        <button class="btn-primary" @click="onFinish">設定を完了する</button>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
/* アニメーション定義 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px); /* 10px下からスライドしてくる演出 */
}

/* 以下は既存のスタイル */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  text-align: center;
  min-height: 300px; 
}

.step-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  width: 100%;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;
}

.option-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 1.1rem;

  input[type="checkbox"] {
    transform: scale(1.2);
  }
}

.btn-primary {
  padding: 0.5rem 2rem;
  font-size: 1rem;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3367d6; 
  }
}
</style>