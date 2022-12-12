<script setup lang="ts">
import { ref } from "vue";

import { supabase } from "@/services/supabase.js";
import { useAuthStore } from "@/stores/auth";
import AppModal from "@/components/AppModal.vue";

const loading = ref(false);
const { setAuthUser } = useAuthStore();
const signUp = ref(false);
const toggleSignUp = () => {
  signUp.value = !signUp.value;
};
const modalTitle = ref("");
const modalDescription = ref("");

const setModalText = (title: string, description: string) => {
  modalTitle.value = title;
  modalDescription.value = description;
};

const isOpen = ref(false);
const toggleModal = () => {
  isOpen.value = !isOpen.value;
};

const email = ref("");
const password = ref("");
const username = ref("");

const handleSignUp = async () => {
  try {
    loading.value = true;

    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          username: username.value,
        },
      },
    });

    if (error) throw error;

    toggleModal();
    setModalText(
      "New user created",
      "Please click the confirmation link sent to your email"
    );
  } catch (error) {
    if (error instanceof Error) {
      toggleModal();
      setModalText("Error", error.message);
    }
  } finally {
    loading.value = false;
  }
};

const handleSignIn = async () => {
  try {
    loading.value = true;

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;

    setAuthUser(data);
  } catch (error) {
    if (error instanceof Error) {
      toggleModal();
      setModalText("Error", error.message);
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <AppModal
    v-if="isOpen"
    :isOpen="isOpen"
    :title="modalTitle"
    :description="modalDescription"
    @CLOSE_MODAL="toggleModal"
  />
  <button @click="toggleSignUp">
    {{ signUp ? "Already have an account? Sign In" : "Sign Up" }}
  </button>
  <form @submit.prevent="handleSignUp" v-if="signUp">
    <div>
      <h1>Supabase + Vue 3</h1>

      <p>Sign up below</p>

      <div>
        <input type="email" placeholder="Your email" v-model="email" required />
        <input
          type="password"
          placeholder="Your password"
          v-model="password"
          required
        />
        <input
          type="text"
          placeholder="Your username"
          v-model="username"
          required
        />
      </div>

      <div>
        <input
          type="submit"
          :value="loading ? 'Loading' : 'Sign up'"
          :disabled="loading"
        />
      </div>
    </div>
  </form>
  <form v-else @submit.prevent="handleSignIn">
    <div>
      <h1>Supabase + Vue 3</h1>

      <p>Sign in below</p>

      <div>
        <input type="email" placeholder="Your email" v-model="email" required />
        <input
          type="password"
          placeholder="Your password"
          v-model="password"
          required
        />
      </div>

      <div>
        <input
          type="submit"
          :value="loading ? 'Loading' : 'Sign In'"
          :disabled="loading"
        />
      </div>
    </div>
  </form>
</template>
