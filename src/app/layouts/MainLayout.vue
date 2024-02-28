<template>
  <q-layout view="lHh Lpr lFf">
    <MainHeaderComponent />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import { MainHeaderComponent } from '@widgets/mainHeader';
</script>
