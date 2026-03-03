<script setup>
import Note from "@/components/Note.vue";
import GoUp from "@/components/GoUp.vue";
</script>
<template>
    <div class="notes-list">
        <GoUp />
        <Note />
        <Note />
        <Note :isProgressable="true" />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
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
