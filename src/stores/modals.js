import { defineStore } from "pinia";
import { ref } from "vue";

export const useModals = defineStore("modals", () => {
  const createNote = ref(false);

  return { createNote };
});
