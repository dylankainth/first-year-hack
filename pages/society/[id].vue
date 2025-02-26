<template>
    <div class="container mx-auto px-4 py-2">

        <div v-if="societyData">

            <h1 class="text-2xl font-bold pt-4">
                {{ societyData.societyName.name }}
            </h1>
            <h1 class="text-2xl font-bold pt-4">
                Leaderboard
            </h1>
            <div class="pt-4">
                <table class="w-full border-collapse border border-gray-300">
                    <thead class="bg-gray-200">
                        <tr>
                            <th class="border border-gray-300 px-4 py-2 text-left">#</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Email</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">Attended Events</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, index) in societyData.data" :key="societyData.data.userId"
                            class="odd:bg-white even:bg-gray-50">
                            <td class="border border-gray-300 px-4 py-2">{{ index + 1 }}</td>
                            <td class="border border-gray-300 px-4 py-2">{{ user.email }}</td>
                            <td class="border border-gray-300 px-4 py-2 font-semibold">{{ user.attendedEvent }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
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

<style scoped>
.bg-gray-200 {
    font-size: 12px;
}
</style>