import { defineStore } from "pinia";
import { ref } from "vue";

export const useNotesStore = defineStore("notes", () => {
  const notes = ref([]);
  function deleteNote(note) {
    notes.value = notes.value.filter((obj) => obj.id != note.id);
  }
  return { notes, deleteNote };
});
