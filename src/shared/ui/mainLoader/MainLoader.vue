<template>
  <teleport to="body" v-if="isOpen">
    <div class="main-loader">
      <q-spinner
        color="primary"
        size="3em"
        :thickness="10"
      />
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

defineProps({
  isOpen: {
    default: false,
    type: Boolean as PropType<boolean>
  }
});
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
