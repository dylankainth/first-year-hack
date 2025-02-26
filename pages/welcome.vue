<template>
    <div class="flex flex-col justify-center items-center h-screen">
        <img src="~/assets/img/KingsQuest.png">

        <p class="text-center mt-4">Become an active member of KCL societies.</p>

        <LoginForm />
    </div>

</template>

<script setup lang="ts">
definePageMeta({
    layout: 'welcome'
})
</script>