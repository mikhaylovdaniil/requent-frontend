<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isVisible = ref(false);

function handleScroll() {
    isVisible.value = window.scrollY > 1000;
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

onMounted(() => {
    window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
    <transition name="fade">
        <button v-show="isVisible" class="scroll-top-btn" @click="scrollToTop">
            ↑
        </button>
    </transition>
</template>

<style>
.scroll-top-btn {
    position: fixed;
    right: 24px;
    bottom: 24px;

    width: 48px;
    height: 48px;

    border-radius: 24px;
    border: none;

    background: #1a1d21;
    color: #5b8cff;

    font-size: 20px;
    cursor: pointer;

    z-index: 1000;

    box-shadow:
        0 8px 24px rgba(0, 0, 0, 0.45),
        inset 0 0 0 1px rgba(255, 255, 255, 0.03),
        inset 0 2px 4px rgba(0, 0, 0, 0.4);

    transition:
        background 120ms ease,
        transform 120ms ease;
}

.scroll-top-btn:hover {
    background: #252a31;
}

.scroll-top-btn:active {
    background: #12161b;
    transform: translateY(1px);
}

.fade-enter-active,
.fade-leave-active {
    transition:
        opacity 150ms ease,
        transform 300ms ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(8px);
}
</style>
