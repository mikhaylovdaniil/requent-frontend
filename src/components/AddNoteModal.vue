<script setup>
import { reactive } from "vue";
import { useModals } from "@/stores/modals";
import { useNotesStore } from "@/stores/notes";
import { storeToRefs } from "pinia";

const modals = useModals();
const { notes } = storeToRefs(useNotesStore());

const form = reactive({
    title: "",
    description: "",
    tags: "",
});

const handleClose = () => {
    modals.createNote = false;
};

const handleClick = async () => {
    try {
        const response = await fetch("api/notes/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: form.title,
                description: form.description,
                tags: form.tags
                    .split("#")
                    .map((tag) => tag.trim())
                    .filter((tag) => tag.length > 1),
            }),
        });

        if (response.ok) {
            modals.createNote = false;
            // TODO: toast notification
            const data = await response.json();
            data.note = { ...data.note, tags: data.note.tags.split(",") };
            notes.value = [...notes.value, data.note];
        } else {
            throw Error(response.statusText);
        }
    } catch (err) {
        console.log("Error while creating note: " + err);
    }
};
</script>
<template>
    <div class="modal-overlay">
        <div class="modal">
            <div class="modal-header">
                <h2>New Note</h2>
                <button class="modal-close" @click="handleClose">✕</button>
            </div>

            <div class="modal-body">
                <label class="form-group">
                    <span>Title</span>
                    <input
                        type="text"
                        placeholder="Enter the note"
                        v-model="form.title"
                    />
                </label>

                <label class="form-group">
                    <span>Description</span>
                    <textarea
                        v-model="form.description"
                        rows="4"
                        placeholder="Note description..."
                    ></textarea>
                </label>

                <label class="form-group">
                    <span>Tags</span>
                    <input
                        type="text"
                        placeholder="#work #ideas"
                        v-model="form.tags"
                    />
                </label>
            </div>

            <div class="modal-footer">
                <button class="btn btn-secondary" @click="handleClose">
                    Cancel
                </button>
                <button class="btn btn-primary" @click="handleClick">
                    Create
                </button>
            </div>
        </div>
    </div>
</template>
<style scooped>
/* Overlay */

.modal-overlay {
    position: fixed;
    inset: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(6px);

    z-index: 2000;
}

/* Modal */

.modal {
    width: 420px;
    max-width: 90%;

    background: #1a1d21;
    border-radius: 16px;

    box-shadow:
        0 20px 50px rgba(0, 0, 0, 0.6),
        inset 0 1px 0 rgba(255, 255, 255, 0.03);

    overflow: hidden;
}

/* Header */

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 16px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.modal-header h2 {
    margin: 0;
    font-size: 18px;
}

.modal-close {
    background: none;
    border: none;
    color: #aaa;
    font-size: 18px;
    cursor: pointer;
}

/* Body */

.modal-body {
    padding: 20px;

    display: flex;
    flex-direction: column;
    gap: 16px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.form-group span {
    font-size: 13px;
    color: #aaa;
}

/* Inputs */

input,
textarea {
    background: #121417;
    border: 1px solid rgba(255, 255, 255, 0.06);

    border-radius: 8px;
    padding: 10px 12px;

    color: white;
    font-size: 14px;

    outline: none;
}

input:focus,
textarea:focus {
    border-color: #5b8cff;
}

/* Footer */

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;

    padding: 16px 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
}

/* Buttons */

.btn {
    padding: 8px 14px;
    border-radius: 8px;

    border: none;
    cursor: pointer;

    font-size: 14px;
}

.btn-primary {
    background: #5b8cff;
    color: white;
}

.btn-secondary {
    background: #2a2f36;
    color: #ccc;
}
</style>
