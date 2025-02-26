<template>
    <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h1 class="text-2xl font-bold text-center mb-6 text-gray-800">Check in</h1>

            {{ email }}
            <div v-if="!imageSrc" class="mb-4">
                <video ref="video" class="w-full h-64 object-cover rounded-lg"></video>
            </div>

            <div v-else class="mb-4">
                <img :src="imageSrc" alt="Captured" class="w-full h-64 object-cover rounded-lg" />
            </div>

            <div class="flex justify-center space-x-4">
                <button v-if="!imageSrc" @click="captureImage"
                    class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                    Capture
                </button>
                <button v-else @click="retake"
                    class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                    Retake
                </button>

                <button v-if="imageSrc" @click="submit"
                    class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                    Submit
                </button>
            </div>




        </div>
    </div>
</template>

<script>
import { useCookie } from "#app";
import decodeJwt from "~/utils/decodeJWT";

export default {
    name: 'CameraPage',
    data() {
        return {
            stream: null,
            imageSrc: null,
            base64Image: null,
            email: null,
        }
    },
    created() {
        const token = useCookie("auth_token").value;
        if (token) {
            this.email = decodeJwt(token);
        }
    },
    mounted() {
        this.startCamera()
    },
    beforeUnmount() {
        this.stopCamera()
    },
    methods: {
        async startCamera() {
            try {
                this.stream = await navigator.mediaDevices.getUserMedia({ video: true })
                this.$refs.video.srcObject = this.stream
                this.$refs.video.play()
            } catch (error) {
                console.error('Error accessing camera:', error)
            }
        },
        stopCamera() {
            if (this.stream) {
                const tracks = this.stream.getTracks()
                tracks.forEach(track => track.stop())
            }
        },
        captureImage() {
            const canvas = document.createElement('canvas')
            canvas.width = this.$refs.video.videoWidth
            canvas.height = this.$refs.video.videoHeight
            canvas.getContext('2d').drawImage(this.$refs.video, 0, 0)
            this.imageSrc = canvas.toDataURL('image/jpeg')
            this.base64Image = this.imageSrc.split(',')[1]
            this.stopCamera()
        },
        retake() {
            this.imageSrc = null
            this.base64Image = null
            this.startCamera()
        }
    }
}
</script>