<template>
  <div class="post-list">
    <q-scroll-area dark>
      <div class="post-list__items">
        <PostCardComponent :post="post" v-for="post in postsList" :key="post.id" />
      </div>
    </q-scroll-area>
    <div class="post-list__action">
      <AddPostComponent #default="addButton">
        <PrimaryButton color="primary" icon="add" @click="addButton.onClick" />
      </AddPostComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import './style.scss';
import { PostCardComponent, postModel } from '@entities/post';
import { AddPostComponent } from '@features/post/addPost';
import { PrimaryButton } from '@shared/ui';

const { data: postsList } = postModel.usePost();
</script>
