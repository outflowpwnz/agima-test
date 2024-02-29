<template>
  <button
    :type="type"
    @click="onButtonClick"
    :disabled="isDisabled"
    :class="[
      'abstract-button',
      { [`abstract-button--${theme}`]: theme}
    ]"
  >
    <div v-if="icon" class="abstract-button__icon">
      <SvgIcons :icon="icon"/>
    </div>
  </button>
</template>

<script lang="ts" setup>
import { ButtonHTMLAttributes } from 'vue';
import { EButtonTheme } from '@shared/lib'
import { SvgIcons } from '@shared/ui'
type TProps = {
  type?: ButtonHTMLAttributes['type'];
  icon?: string;
  theme?: EButtonTheme;
  isDisabled?: boolean
}

type TEmits = {
  (event: 'click'): void
}

defineProps<TProps>();
const emits = defineEmits<TEmits>();

const onButtonClick = () => {
  emits('click')
}
</script>

<style lang="scss">
@import './style.scss';
</style>