<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
const { isLoggedIn } = storeToRefs(useAuthStore());
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink :disabled="!isLoggedIn" to="/dashboard">Dashboard</RouterLink>
      <RouterLink :disabled="isLoggedIn" to="/login">Login</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>
