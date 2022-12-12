import type { User, Session } from "@supabase/supabase-js";
import { defineStore } from "pinia";
import { ref } from "vue";

type SupabaseUserInfo =
  | {
      user: User | null;
      session: Session | null;
    }
  | {
      user: null;
      session: null;
    };

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: ref(false),
    userInfo: ref({} as SupabaseUserInfo),
  }),
  actions: {
    setAuthUser(data: SupabaseUserInfo) {
      this.userInfo = data;
      this.isLoggedIn = true;
    },
    cleanAuthStore() {
      this.userInfo = {} as SupabaseUserInfo;
      this.isLoggedIn = false;
    },
  },
});
