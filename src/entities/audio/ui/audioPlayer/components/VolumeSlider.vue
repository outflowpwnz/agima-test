<template>
  <div class="volume-slider">
    <div class="volume-slider__icon-wrapper">
      <img src="../../../../../shared/assets/icons/volume-cross.svg" alt="Тише" class="volume-slider__icon">
    </div>
    <div class="volume-slider__range-slider">
      <RangeSlider
        name="volume"
        id="volume"
        v-model="volume"
        :max="max"
        :min="0"
      />
    </div>
    <div class="volume-slider__icon-wrapper">
      <img src="../../../../../shared/assets/icons/volume-loud.svg" alt="Громче" class="volume-slider__icon">
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RangeSlider } from '@shared/ui'

type TProps = {
  modelValue: number
  max: number
}

type TEmits = {
  (event: 'update:modelValue', nextModelValue: number): void
}

const props = defineProps<TProps>()
const emits = defineEmits<TEmits>()

const volume = computed({
  get: () => props.modelValue,
  set: (nextValue: number) => emits('update:modelValue', nextValue)
})
</script>

<style lang="scss">
@import './style.scss';
</style>