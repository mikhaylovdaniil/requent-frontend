<script setup>
import Note from "@/components/Note.vue";
import GoUp from "@/components/GoUp.vue";
import { onMounted, ref, computed } from "vue";
import { useNotesStore } from "@/stores/notes.js";
import { storeToRefs } from "pinia";

const notesStore = useNotesStore();
const { notes } = storeToRefs(notesStore);
const isLoading = ref(true);

onMounted(async () => {
    try {
        const response = await fetch("api/notes/");
        notes.value = await response.json();
        notes.value = notes.value.map((note) => ({
            ...note,
            tags: note.tags.split(","),
        }));
    } catch (err) {
        console.log(`Error while getting notes: ${err}`);
    } finally {
        isLoading.value = false;
    }
});
</script>
<template>
    <div class="notes-list">
        <GoUp />
        <Note v-for="note in notes" :note="note" />
    </div>
</template>

<style scooped>
.notes-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 720px;
    margin: 0 auto;
    margin-top: 10px;
}
</style>
