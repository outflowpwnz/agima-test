<template>
  <q-page class="posts-page">
    <div class="q-pa-md row items-start q-gutter-md">
      <PostList />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { PostList } from '@widgets/post/postList';
</script>
