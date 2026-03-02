<script setup>
import { RouterLink, useRoute } from "vue-router";
import baseRoutes from "@/router/routes.js";
import { capitalized, isMenuItem } from "@/utils/strings";

const routes = baseRoutes
    .filter((route) => isMenuItem(route.name))
    .map((route) => {
        return { ...route, name: capitalized(route.name.slice(1)) };
    });

const activeStyle = (route) => {
    const currentRoute = useRoute();
    return currentRoute.path == route ? "navitem-active" : "";
};
</script>

<template>
    <div class="navbar">
        <RouterLink v-for="route in routes" :to="route.path">
            <button :class="`navitem ${activeStyle(route.path)}`">
                {{ route.name }}
            </button>
        </RouterLink>
    </div>
</template>

<style scooped>
.navbar {
    height: 50px;
    width: 100%;
    background-color: var(--bg-elevated);
    display: flex;
    align-items: center;
    padding: 0px 10px;
}

.navitem {
    height: 40px;
    width: 100px;
    background-color: var(--bg-surface);
    margin-right: 5px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border: 1px solid var(--border);
    color: white;
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
