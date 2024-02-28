<template>
  <form @submit.prevent="onSubmit" class="form-example">
    <FormFields
      v-for="field in fields"
      :field="field"
      :key="field!.name"
      v-model="field!.value"
    />
    <q-btn
    type="submit"
    >
      Submit
    </q-btn>
  </form>
</template>

<script setup lang="ts">
import './style.scss'
import { useForm } from '@shared/lib/hooks';
import { someFormFields } from '../../confirg/fields';
import FormFields from '@shared/ui/formFields/FormField.vue';
import { Notify } from 'quasar';

const { fields, handleSubmit } = useForm(someFormFields);
const onSubmit = handleSubmit(async (data) => {
  Notify.create({
    message: `data: ${JSON.stringify(data)}`,
    color: 'green'
  })
})

</script>
