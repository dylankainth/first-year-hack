<template>
    <div>
        <p v-if="loading">Verifying...</p>
        <p v-else-if="error">Invalid or expired link.</p>
        <p v-else>Login successful! Redirecting...</p>
    </div>
</template>

<script setup>
import { useRoute, useFetch, navigateTo } from "#app";

const route = useRoute();
const { error, pending } = await useFetch(`/api/auth/callback?token=${route.query.token}`);

if (!error.value) {
    setTimeout(() => navigateTo("/"), 2000);
}
</script>