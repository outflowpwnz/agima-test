<template>
  <slot :onClick="handleToggleIsAuth" :isAuth="isAuth" :label="authorizationLabel"/>
</template>

<script lang="ts" setup>
import { userModel } from '@entities/user';

const { isAuth, authorizationLabel, updateIsAuth} =  userModel.useStore();
const handleToggleIsAuth = () => {
  updateIsAuth(!isAuth.value);
};
</script>
