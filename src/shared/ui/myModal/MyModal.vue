<template>
  <q-dialog
    :model-value="isOpen"
    @update:model-value="$emit('update:isOpen', $event)"
  >
    <slot />
  </q-dialog>
</template>

<script setup lang="ts">
type TProps = {
  isOpen: boolean
}

defineProps<TProps>();
</script>
