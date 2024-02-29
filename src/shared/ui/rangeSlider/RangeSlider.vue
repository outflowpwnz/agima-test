<template>
  <div :class="[
    'range-slider',
    { [`range-slider--${theme}`]: theme }
  ]">
    <div class="range-slider__background">
      <div class="range-slider__progress" :style="progressStyles"></div>
    </div>
    <input class="range-slider__input" type="range" :name="name" :id="id" v-model="value" :max="max" :min="min">
  </div>
</template>

<script setup lang="ts">
import { ERangeSliderTheme } from '@shared/lib';
import { computed, CSSProperties } from 'vue'
type TProps = {
  name: string
  theme?: ERangeSliderTheme
  id: string
  max: number
  min: number;
  modelValue: number
}

const progressStyles = computed<CSSProperties>(() => {
  const width = (value.value / props.max) * 100
  return { width: `${width}%` }
})

type TEmits = {
  (event: 'update:modelValue', value: number): void
}

const props = defineProps<TProps>()
const emits = defineEmits<TEmits>()


const value = computed({
  get: () => props.modelValue,
  set: (nextValue: number) => emits('update:modelValue', nextValue) 
})
</script>

<style lang="scss">
@import './style.scss';
</style>