<template>
  <q-select
    filled
    :label="field.placeholder"
    :model-value="field.value"
    :options="field.options"
    :color="field.isError ? 'red' : ''"
    @update:modelValue="$emit('update:modelValue', $event.value)"
  />
</template>

<script setup lang="ts">
import { TFormField, TValue } from '@shared/lib/hooks';

type TProps = {
  field: TFormField<TValue>
  modelValue: TValue
}
const { field } = defineProps<TProps>();
</script>
