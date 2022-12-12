<script setup lang="ts">
import { supabase } from "@/services/supabase";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const { isLoggedIn } = storeToRefs(useAuthStore());
const { cleanAuthStore } = useAuthStore();
const signOut = async () => {
  await supabase.auth.signOut();
  cleanAuthStore();
};
</script>

<template>
  <main>
    <h1>Home Page</h1>

    <button v-if="isLoggedIn" @click="signOut">Sign Out</button>
  </main>
</template>
