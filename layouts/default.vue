<template>
    <div class="layout-wrapper">
        <div class="mobile-container">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.layout-wrapper {
    display: flex;
    justify-content: center;
    min-height: 100vh;
    background-color: #f5f5f5;
    padding: 16px;
    /* Add padding to create space on the sides */
}

.mobile-container {
    width: 375px;
    /* Standard mobile width (e.g., iPhone 12) */
    max-width: 100%;
    height: 812px;
    /* Standard mobile height */
    max-height: 90vh;
    background: white;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    overflow: hidden;
}

@media (max-width: 768px) {
    .layout-wrapper {
        padding: 0;
        background-color: transparent;
    }

    .mobile-container {
        width: 100%;
        height: auto;
        max-height: none;
        box-shadow: none;
        border-radius: 0;
    }
}
</style>