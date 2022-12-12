<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
const { userInfo } = useAuthStore();
const pseudo = userInfo.user?.user_metadata.username
  ? userInfo.user?.user_metadata.username
  : "stranger";
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <p>Welcome {{ pseudo }}!</p>
  </div>
</template>
