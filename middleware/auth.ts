import { defineNuxtRouteMiddleware, navigateTo, useCookie } from "nuxt/app";

export default defineNuxtRouteMiddleware((to) => {
    const authToken = useCookie("auth_token").value;

    // Check if user is trying to access a protected route without being logged in
    if (!authToken && to.path !== "/welcome") {
        return navigateTo("/welcome");
    }

});
