<template>

  <q-file
    outlined
    :model-value="field.value"
    :label="field.placeholder"
    :error="field.isError"
    :error-message="field.errorMessage"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
    <template v-slot:prepend>
      <q-icon name="attach_file" />
    </template>
  </q-file>
</template>

<script setup lang="ts">
import { TFormField, TValue } from '@shared/lib/hooks';

type TProps = {
  field: TFormField<TValue>
  modelValue: TValue
}
const { field } = defineProps<TProps>();

</script>
