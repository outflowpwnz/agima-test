<template>
  <q-checkbox
    :label="field.placeholder"
    :model-value="field.value"
    keep-color
    :color="field.isError ? 'red' : ''"
    @update:modelValue="$emit('update:modelValue', $event)"
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
