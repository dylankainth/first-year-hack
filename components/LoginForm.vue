<template>

    <input v-model="email" type="email" placeholder="Enter your email" required />
    <button @click="submit">Send Magic Link</button>

</template>

<script>
export default {
    data() {
        return {
            email: ''
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
        }
    }
}
</script>