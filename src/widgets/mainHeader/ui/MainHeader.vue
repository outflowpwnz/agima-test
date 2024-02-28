<template>
  <q-header elevated>
    <q-toolbar class="bg-primary text-white q-my-md">
      <router-link to="/">
        <q-avatar>
          <img
            src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"
            alt="logo"
          />
        </q-avatar>
      </router-link>
      <q-btn
        v-for="link in navMenu"
        stretch
        flat
        :label="link.label"
        :key="link.link"
        :to="link.link"
      />
      <q-space />
      <ChangeAuthorizationComponent #default="auth">
        <q-btn
          stretch
          flat
          :label="auth.label"
          @click="auth.onClick"
        />
      </ChangeAuthorizationComponent>

    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { navMenu } from '../config/navMenu';
import { ChangeAuthorizationComponent } from '@features/user/changeAuthorization';
</script>
