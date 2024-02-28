<template>
  <q-input
    outlined
    :model-value="field.value"
    @update:modelValue="$emit('update:modelValue', $event)"
    :label="field.placeholder"
    :error="field.isError"
    :error-message="field.errorMessage"
    :type="inputType"
  >
    <template v-slot:append v-if="isShowTogglePassword">
      <q-icon
        :name="isShowPassword ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="handleTogglePassword"
      />
    </template>

  </q-input>

</template>

<script setup lang="ts">
import { TFormField, TValue } from '@shared/lib/hooks';
import { computed, ref } from 'vue';

type TProps = {
  field: TFormField<any>
  modelValue: TValue
}

const { field } = defineProps<TProps>();
const isShowPassword = ref(false);
const isShowTogglePassword = computed(() => field.type === 'password');
const inputType = computed(() => {
  if (!isShowTogglePassword.value) return field.type;
  return isShowPassword.value ? 'text' : 'password';
});
const handleTogglePassword = () => {
  isShowPassword.value = !isShowPassword.value;
};
</script>
