<template>
  <div>
    <MainLoader :is-open="isPending" />
    <slot :onClick="handleOpenModal" />
    <MyModal v-model:is-open="isOpenModal">
      <q-card>
        <form @submit.prevent="onSubmit" ref="form">
          <q-card-section>
            <div class="text-h6">Alert</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <CInput v-for="field in addPostFields" :key="field!.name" :field="field" v-model="field!.value"/>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" type="submit" :disable="isPending" />
          </q-card-actions>
        </form>
      </q-card>
    </MyModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { createPostInputs } from '../config/inputs.config';

import { MyModal, MainLoader } from '@shared/ui';
import { useForm } from '@shared/lib/hooks';
import {  postModel } from '@entities/post';
import CInput from '@shared/ui/formFields/cInput/CInput.vue';

const isOpenModal = ref(false);
const {
  fields: addPostFields,
  handleSubmit,
  onReset,
  setErrors
} = useForm(createPostInputs);

const { mutateAsync, isPending } = postModel.useAddPostMutation();

const handleOpenModal = () => {
  onReset();
  isOpenModal.value = true;
};

const onSubmit = handleSubmit(async (data) => {
  await mutateAsync({
    title: data.title,
    body: data.body,
    password: data.password,
    confirm: data.confirm
  });

  setErrors({
    body: 'test',
    title: 'test'
  });
  // isOpenModal.value = false;
  // onReset();
});
</script>
