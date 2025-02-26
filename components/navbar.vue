<template>

    <div class="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200">
        <div class="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">

            <NuxtLink to="/" type="button"
                class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
                <svg class="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 dark:group-hover:text-columbia-500"
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                <span
                    class="text-sm text-gray-500 dark:text-gray-400 dark:group-hover:text-columbia-500">Dashboard</span>
            </NuxtLink>

            <NuxtLink to="/events" type="button"
                class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">


                <svg class="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 dark:group-hover:text-columbia-500"
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                    viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                        d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                        clip-rule="evenodd" />
                </svg>

                <span class="text-sm text-gray-500 dark:text-gray-400 dark:group-hover:text-columbia-500">Events</span>
            </NuxtLink>

            <NuxtLink to="/profile" type="button"
                class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
                <svg class="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 dark:group-hover:text-columbia-500"
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
                <span class="text-sm text-gray-500 dark:text-gray-400 dark:group-hover:text-columbia-500">Profile</span>
            </NuxtLink>
        </div>
    </div>
</template>

<style scoped>
.router-link-active>svg {

    color: oklch(0.623 0.214 259.815)
}
</style>