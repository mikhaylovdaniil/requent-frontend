<script setup>
import { RouterLink, useRoute } from "vue-router";
import baseRoutes from "@/router/routes.js";
import { capitalized, isMenuItem } from "@/utils/strings";
import AddNoteModal from "./AddNoteModal.vue";

import SvgHome from "@/assets/icons/svgHome.vue";
import SvgNotes from "@/assets/icons/svgNotes.vue";
import { useModals } from "@/stores/modals";

const routes = baseRoutes
    .filter((route) => isMenuItem(route.name))
    .map((route) => {
        return { ...route, name: capitalized(route.name.slice(1)) };
    });

const activeStyle = (route) => {
    const currentRoute = useRoute();
    return currentRoute.path == route ? "navitem-active" : "";
};

const modals = useModals();
const handleCreate = () => {
    modals.createNote = true;
};
const icons = {
    Home: SvgHome,
    Notes: SvgNotes,
};
</script>

<template>
    <div class="navbar-container">
        <div class="navbar">
            <RouterLink v-for="route in routes" :to="route.path">
                <button :class="`navitem ${activeStyle(route.path)}`">
                    <component
                        v-if="Object.hasOwn(icons, route.name)"
                        :is="icons[route.name]"
                    ></component>
                    <span v-else>{{ route.name }}</span>
                </button>
            </RouterLink>
            <button class="navitem squared" @click="handleCreate">
                New Note
            </button>
        </div>
    </div>
    <AddNoteModal v-if="modals.createNote" />
</template>

<style scooped>
.navbar-container {
    padding: 10px;
    width: 100%;
    height: 60px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
}
.navbar {
    display: flex;
    justify-content: center; /* Logo слева, кнопки справа */
    align-items: center;
    gap: 6px;

    z-index: 100;
    position: fixed;
    height: 40px;
    width: 100%;
    background-color:
        linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.04),
            rgba(255, 255, 255, 0.01)
        ),
        rgba(32, 36, 42, 0.55);

    padding: 0px 20px;
    max-width: 730px;
    margin: 0 auto;

    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 20px;

    /* glassmorphism */
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);

    box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.04),
        0 12px 32px rgba(0, 0, 0, 0.45);
}

.navitem {
    display: flex;

    height: 36px;
    width: 36px;
    background-color: var(--bg-surface);
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--border);
    color: white;

    font-size: 14px;
}

.squared {
    width: 100px;
    height: 36px;
    border-radius: 15px;
}

.navitem:hover {
    background: linear-gradient(to bottom, #11151a, #12161b 60%, #141920);
}

.navitem-active {
    background-color: var(--bg-surface-active);
}

.navitem-active:hover {
    background: var(--bg-surface-active);
    cursor: default;
}
</style>
