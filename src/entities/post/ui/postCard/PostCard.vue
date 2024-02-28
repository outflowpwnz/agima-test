<template>
  <q-card dark bordered class="bg-grey-9 my-card">
    <q-card-section>
      <div class="text-h6">{{ post.title }}</div>
    </q-card-section>

    <q-separator dark inset />

    <q-card-section>
      {{ post.description }}
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { IPostItem } from '@entities/post';
type TProps = {
  post: IPostItem
}
const { post } = defineProps<TProps>();
</script>
