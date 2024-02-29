<template>
  <div class="child-audio-player">
    <AudioPlayer
      :audioList="music"
    />
  </div>
</template>

<script setup lang="ts">
import { AudioPlayer } from '@entities/audio';
const music = [
  {
    label: 'Барбарики',
    previewPath: 'images/barbariki.jpg',
    path: 'audio/barbarik-dobrota.mp3'
  },
  {
    label: 'Синий трактор',
    previewPath: 'images/siniy-traktor.png',
    path: 'audio/siniy-traktor.mp3'
  },
  {
    label: 'Фиксики',
    previewPath: 'images/fixiki.jpg',
    path: 'audio/fiksiki.mp3'
  }
]
</script>