import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";

export default defineNuxtRouteMiddleware((to) => {
    const authToken = useCookie("auth_token").value;

    // Check if user is trying to access a protected route without being logged in
    if (!authToken && to.path !== "/welcome") {
        return navigateTo("/welcome");
    }

    // If user is logged in, redirect to /onload if they are on /welcome
    if (authToken && to.path === "/welcome") {
        return navigateTo("/onload");
    }
});
