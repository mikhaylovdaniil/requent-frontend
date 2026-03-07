<script setup>
import { defineProps, computed } from "vue";
import { useNotesStore } from "@/stores/notes.js";

const notesStore = useNotesStore();

const props = defineProps({
    note: {
        type: Object,
        default: {},
    },
});

const handleComplete = async () => {
    try {
        const response = await fetch(`api/notes/${props.note.id}/complete`, {
            method: "PUT",
        });
        if (response.ok) props.note.progress = (await response.json()).progress;
    } catch (err) {
        console.log("Error while completing note: " + err);
    }
};

const handleDelete = async () => {
    try {
        const response = await fetch(`api/notes/${props.note.id}`, {
            method: "DELETE",
        });
        if (response.ok) notesStore.deleteNote(props.note);
    } catch (err) {
        console.log("Error while deleting note: " + err);
    }
};
</script>
<template>
    <div class="container">
        <p class="title">{{ note.title }}</p>
        <p class="metadata">{{ note.created_at }}</p>
        <p class="description">
            {{ note.description }}
        </p>
        <div class="tags">
            <button v-for="(tag, index) in note.tags" :key="tag" class="tag">
                {{ tag }}
            </button>
        </div>
        <div class="progress">
            <div
                class="progress-fill"
                :style="{ width: note.progress + '%' }"
            ></div>
        </div>

        <div class="card-actions">
            <button class="btn-complete" @click="handleComplete">
                Complete
            </button>
            <button class="btn-delete" @click="handleDelete">Delete</button>
        </div>
    </div>
</template>
<style scooped>
.container {
    position: relative;
    cursor: pointer;
    background: var(--card-primary);
    border-radius: 12px;
    padding: 16px;
    border: 1px solid var(--border);

    transition:
        background 120ms ease,
        transform 80ms ease,
        box-shadow 120ms ease;
}

.container:focus-visible {
    outline: 2px solid #5b8cff;
    outline-offset: 2px;
}

.container:hover {
    background: var(--card-hover);
    box-shadow:
        inset 0 0 0 1px rgba(255, 255, 255, 0.02),
        inset 0 2px 4px rgba(0, 0, 0, 0.4);
}

.title {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 4px;
}

.metadata {
    font-size: 13px;
    color: var(--text-muted);
    margin-bottom: 12px;
}

.description {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-clamp: 3;
    font-size: 14px;
    line-height: 1.5;
    color: var(--text-secondary);
}

.tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 10px;

    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.tag {
    background: var(--card-tag);
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 12px;
    color: var(--text-secondary);
}

.tag:hover {
    background: var(--card-tag-hover);
}

.tag:active {
    background: var(--card-hover);
    box-shadow:
        inset 0 0 0 1px rgba(255, 255, 255, 0.02),
        inset 0 2px 4px rgba(0, 0, 0, 0.4);
}

.progress {
    margin-top: 14px;
    height: 6px;
    background: var(--border);
    border-radius: 4px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: var(--accent);
    transition: width 200ms ease;
}

/* Контейнер кнопок */
.card-actions {
    display: flex;
    gap: 8px;
    margin-top: 12px;
}

/* Базовый стиль кнопки */
.card-actions button {
    padding: 6px 14px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    border: none;
    user-select: none;

    /* Интеграция с карточкой */
    background: var(--card-tag); /* почти как surface */
    color: var(--text-secondary);
    box-shadow:
        inset 0 0 0 1px rgba(255, 255, 255, 0.02),
        inset 0 2px 4px rgba(0, 0, 0, 0.4);

    transition:
        background 120ms ease,
        transform 80ms ease,
        box-shadow 120ms ease,
        color 120ms ease;
}

/* Hover — лёгкое выделение */
.card-actions button:hover {
    background: var(--card-tag-hover);
}

/* Active — Inner Border Compression + slight press */
.card-actions button:active {
    background: var(--card-hover);
    transform: translateY(1px);
    box-shadow:
        inset 0 0 0 1px rgba(255, 255, 255, 0.02),
        inset 0 2px 4px rgba(0, 0, 0, 0.4);
}

/* Акцент цвета текста */
.btn-complete {
    color: var(--text-secondary);
}

.btn-delete {
    color: var(--text-secondary);
}

/* Hover текст немного светлее */
.btn-complete:hover {
    color: var(--accent-hover);
}

.btn-delete:hover {
    color: var(--accent-negative);
}
</style>
