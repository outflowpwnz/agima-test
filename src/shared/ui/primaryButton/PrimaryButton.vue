<template>
  <q-btn class="form-btn" :class="[{ 'form-btn--disabled': isDisabled }]">
    {{ text }}
  </q-btn>
</template>

<script setup lang="ts">

type TProps = {
  isDisabled?: boolean
  text?: string
}

const { isDisabled } = defineProps<TProps>();
</script>
