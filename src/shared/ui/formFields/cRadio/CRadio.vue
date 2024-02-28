<template>
  <q-radio
    v-for="option in field.options"
    :model-value="field.value"
    :val="option.value"
    :label="option.label"
    @update:modelValue="$emit('update:modelValue', $event)"
    :key="`${field.value}-${option.value}`"
  />
</template>

<script setup lang="ts">
import { TFormField, TValue } from '@shared/lib/hooks';

type TProps = {
  field: TFormField<any>
  modelValue: TValue
}
const { field } = defineProps<TProps>();
</script>
