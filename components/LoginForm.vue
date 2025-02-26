<template>


    <div>
        <div class="mb-6" v-if="status === 0">
            <input v-model="email" type="email" placeholder="Enter your email" id="large-input"
                class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500">
            <div class="flex justify-center mt-4">
                <button @click="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Send
                    Magic Link</button>
            </div>
        </div>
        <div class="mb-6" v-if="status === 1">
            <p><u>Please check your email</u></p>
        </div>

    </div>






</template>

<script>
export default {
    data() {
        return {
            email: '',
            status: 0,
        }
    },
    methods: {
        async submit() {

            await fetch("/api/auth/magic-link", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: this.email }),
            });

            this.status = 1;
        }
    }
}
</script>