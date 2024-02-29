<template>
  <q-layout view="lHh Lpr lFf" class="main-layout">
    <MainHeaderComponent />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import { MainHeaderComponent } from '@widgets/mainHeader';
</script>

<style lang="scss">
@import './style.scss';
</style>
