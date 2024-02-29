<template>
  <q-page class="index-page" padding>
    <div class="index-page__player">
      <ChildsAudioPlayer />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ChildsAudioPlayer } from '@widgets/childsAudioPlayer';
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
