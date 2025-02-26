<template>
    <div class="container mt-5">
        {{ society }}
    </div>

</template>

<script>
export default {
    data() {
        return {
            society: [],
            status: 0
        }
    },
    async mounted() {

        const response = await fetch('/api/getSociety')
        this.society = await response.json()

        this.status = 1;
    }
}
</script>