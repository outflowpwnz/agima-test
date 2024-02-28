<template>
  <CFile
    v-if="field.type === 'file'"
    :field="field"
    :model-value="field.value"
    @update:modelValue="$emit('update:modelValue', $event)"
  />
  <CCheckbox
    v-else-if="field.type === 'checkbox'"
    :field="field"
    :model-value="field.value"
    @update:modelValue="$emit('update:modelValue', $event)"
  />
  <CSelect
    v-else-if="field.type === 'select'"
    :field="field"
    :model-value="field.value"
    @update:modelValue="$emit('update:modelValue', $event)"
  />
  <CRadio
    v-else-if="field.type === 'radio'"
    :field="field"
    :model-value="field.value"
    @update:modelValue="$emit('update:modelValue', $event)"
  />
  <CInput
    v-else
    :field="field"
    :model-value="field.value"
    @update:modelValue="$emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
import { TFormField, TValue } from '@shared/lib/hooks';
import CInput from './cInput/CInput.vue';
import CFile from '@shared/ui/formFields/cFile/CFile.vue';
import CCheckbox from '@shared/ui/formFields/cCheckbox/CCheckbox.vue';
import CSelect from '@shared/ui/formFields/cSelect/cSelect.vue';
import CRadio from '@shared/ui/formFields/cRadio/CRadio.vue';

type TProps = {
  modelValue: TValue
  field: TFormField<TValue>
}
const { field } = defineProps<TProps>();

</script>
