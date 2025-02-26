<template>
    <div class="container mx-auto px-4 py-2">

        <div v-if="eventData">
            <h1 class="text-2xl font-bold">
                {{ eventData.data.name }}
            </h1>
            <h1 class="text-2xl text-gray-50">
                {{ eventData.data.societyname }}
            </h1>
            <h3 class="text-sm font-bold">
                {{ new Date(eventData.data.date).toLocaleString() }}
            </h3>

            <br>
            <br>

            <h3 class="text-sm">
                {{ eventData.data.description.substring(0, 300) }}...
            </h3>

            <div class="pt-4">
                <NuxtLink :to="'/checkin/' + this.$route.params.id"
                    class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                    Check in</NuxtLink>
            </div>
        </div>




    </div>
</template>

<script>
export default {
    data() {
        return {
            eventData: null
        }
    },
    async mounted() {

        console.log(this.$route.params.id)

        const response = await fetch('/api/getEvent', {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ eventId: this.$route.params.id })
        })

        this.eventData = await response.json()



    }
}
</script>