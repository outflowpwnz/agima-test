<template>
  <div class="audio-player">
    <div class="audio-player__wrapper">
      <div class="audio-player__actions">
        <AbstractButton
          @click="onPrevClick"
          :isDisabled="!isCanPlay"
          icon="prev"
        >
        </AbstractButton>
        <AbstractButton
          :isDisabled="!isCanPlay"
          :theme="EButtonTheme.PRIMARY"
          @click="onPlayPauseClick"
          icon="playpause"
        >
        </AbstractButton>
        <AbstractButton
          icon="next"
          :isDisabled="!isCanPlay"
          @click="onNextClick"
        >
        </AbstractButton>
      </div>
      <div class="audio-player__content">
        <div class="audio-player__volume">
          <VolumeSlider
            :max="MAX_VOLUME"
            v-model="volume"
          />
        </div>
        <div class="audio-player__audio">
          <span class="audio-player__audio-label">
              {{ currentAudio?.label }}
          </span>
          <audio
            ref="audioRef"
            :src="currentAudio?.path"
            @loadedmetadata="onLoadedMetaData"
            @timeupdate="onTimeUpdate"
            @play="onPlay"
            @pause="onPause"
          >
          </audio>
        </div>
        <div class="audio-player__duration">
          <RangeSlider
            :theme="ERangeSliderTheme.PRIMARY"
            name="duration"
            id="duration"
            v-model="currentTime"
            @update:modelValue="onCurrentTypeUpdate"
            :max="duration"
            :min="0"
          />
        </div>
      </div>
      <div
        class='audio-player__preview'
      >
        <img
          :src="currentAudio?.previewPath"
          :alt="`Превью ${currentAudio?.label}`"
          :class="[
            'audio-player__preview-img',
            { 'audio-player__preview-img--paused': isPaused }
          ]">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { TAudioItem } from '@entities/audio'
import { RangeSlider, AbstractButton } from '@shared/ui'
import { EButtonTheme, ERangeSliderTheme } from '@shared/lib';

import VolumeSlider from './components/VolumeSlider.vue';
type TProps = {
  audioList: TAudioItem[]
}

const MAX_VOLUME = 10
const VOLUME_STEPS = 10
const props = defineProps<TProps>()

const volume = ref<number>(MAX_VOLUME / 2)
const currentTime = ref<number>(0)
const duration = ref<number>(0)
const isPaused = ref<boolean>(true)
const isCanPlay = ref<boolean>(false)

const audioRef = ref<HTMLAudioElement>()

const currentAudioIndex = ref<number>(0)
const currentAudio = computed<TAudioItem | null>(() => props.audioList[currentAudioIndex.value] || null)

const isLastSong = computed(() => currentAudioIndex.value + 1 === props.audioList.length)
const isFirstSong = computed(() => currentAudioIndex.value === 0)

const formattedVolume = computed(() => volume.value / VOLUME_STEPS)
const onNextClick = () => {
  if (isLastSong.value) {
    currentAudioIndex.value = 0
  } else {
    currentAudioIndex.value += 1
  }
}

const onPrevClick = () => {
  if (isFirstSong.value) {
    currentAudioIndex.value = props.audioList.length - 1 
  } else {
    currentAudioIndex.value -= 1
  }
}

const onPlayPauseClick = () => {
  if (isCanPlay.value) {
    if (audioRef.value?.paused) {
      audioRef.value?.play()
    } else {
      audioRef.value?.pause()
    }
  }  
}

const onPlay = () => {
  isPaused.value = false
}

const onPause = () => {
  isPaused.value = true
}

const onLoadedMetaData = () => {
  duration.value = parseFloat((audioRef.value?.duration || 0).toFixed(2))
  isCanPlay.value = true
}

const onTimeUpdate = () => {
  currentTime.value = parseFloat((audioRef.value?.currentTime || 0).toFixed(2))
}

const onCurrentTypeUpdate = (nextValue: number) => {
  if (audioRef.value) {
    audioRef.value.currentTime = nextValue
  }
}

watch(formattedVolume, (nextFormattedVolume) => {
  if (audioRef.value) {
    audioRef.value.volume = nextFormattedVolume
  }
})

watch(currentAudio, () => {
  isPaused.value = true
})

onMounted(async () => {
  if (audioRef.value) {
    audioRef.value.volume = formattedVolume.value
  }
})
</script>

<style lang="scss">
@import './style.scss';
</style>