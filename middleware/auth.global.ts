import { defineNuxtRouteMiddleware, navigateTo, useCookie } from "#app";

export default defineNuxtRouteMiddleware((to, from) => {

    const authToken = useCookie("auth_token").value;

    if (!authToken && to.path !== "/welcome" && to.path !== "/auth/callback" && !to.path.startsWith("/api")) {
        return navigateTo("/welcome");
    }
});
