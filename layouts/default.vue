<template>
    <div class="flex flex-col min-h-screen bg-gray-100">
        <AppHeader></AppHeader>
        <main class="container mx-auto mt-16 flex-1 ">
            <slot />
        </main>
        <footer class="bg-blue-600 text-white text-center p-4">
            © 2024 MyApp. All rights reserved.
        </footer>
    </div>
</template>

<script setup>

</script>
