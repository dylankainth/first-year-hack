<template>
    <div class="container mx-auto px-4 py-2">
        <div v-if="societyData">
            <h1 class="text-2xl font-bold">
                {{ societyData.data.name }}
            </h1>
        </div>
    </div>


</template>

<script>
export default {
    data() {
        return {
            societyData: null
        }
    },
    async mounted() {

        console.log(this.$route.params.id)

        const response = await fetch('/api/getSociety', {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ societyId: this.$route.params.id })
        })

        this.societyData = await response.json()



    }
}
</script>