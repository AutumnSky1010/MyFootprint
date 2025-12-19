<script setup lang="ts">
import { ref, watch, type ModelRef } from 'vue';

interface PropsType {
  minHeight?: number;
  mediumHeight?: number;
  maxHeight?: number;
}

const opened = defineModel<boolean>('opened');

const props = withDefaults(defineProps<PropsType>(), {
  minHeight: 120,
  mediumHeight: () => window.innerHeight * 0.5,
  maxHeight: () => window.innerHeight * 0.85,
});

const height = ref(props.mediumHeight);
const isDragging = ref(false);
let startY = 0;
let startHeight = 0;

const onPointerDown = (e: PointerEvent) => {
  isDragging.value = true;
  startY = e.clientY;
  startHeight = height.value;
  (e.target as Element).setPointerCapture(e.pointerId);
};

const onPointerMove = (e: PointerEvent) => {
  if (!isDragging.value) return;
  e.preventDefault();
  const delta = startY - e.clientY;
  height.value = Math.min(
    Math.max(startHeight + delta, props.minHeight),
    props.maxHeight
  );
};

const onPointerUp = (e: PointerEvent) => {
  isDragging.value = false;
  if (height.value > startHeight) {
    if (height.value >= props.maxHeight * 0.8) {
      height.value = props.maxHeight;
    } else {
      height.value = props.mediumHeight;
    }
  } else {
    if (height.value <= (props.minHeight + props.maxHeight) / 2) {
      height.value = props.minHeight;
    } else {
      height.value = props.mediumHeight;
    }
  }
  (e.target as Element).releasePointerCapture(e.pointerId);
};

watch(opened, (open) => {
  if (!open) {
    height.value = props.mediumHeight;
    isDragging.value = false;
  }
});
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="opened" class="backdrop" @click="opened = false" />
    </Transition>

    <Transition name="slide-up">
      <div
        v-if="opened"
        class="bottom-sheet"
        :class="{ 'is-dragging': isDragging }"
        :style="{ height: height + 'px' }"
      >
        <div 
          class="grabber" 
          @pointerdown="onPointerDown" 
          @pointermove="onPointerMove" 
          @pointerup="onPointerUp"
        >
          <div class="grabber-bar" />
        </div>
        
        <div class="content">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 998;
}

.bottom-sheet {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.15);
  
  transition: height 0.2s ease;
  
  &.is-dragging {
    transition: none;
  }

  display: flex;
  flex-direction: column;
  z-index: 999;
}

/* --- トランジション設定 --- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* シートのスライドアニメーション */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1); 
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}

/* --- 既存スタイル --- */

.grabber {
  border-radius: 2px;
  display: flex;
  justify-content: center;
  touch-action: none; 
  background-clip: content-box;
  height: 60px;
  flex-shrink: 0;
}

.grabber-bar {
  width: 40px;
  height: 4px;
  cursor: grab;
  background: #ccc;
  margin: 8px 0;
}

.content {
  padding: 16px;
  padding-top: 0;
  overflow-y: auto;
}
</style>